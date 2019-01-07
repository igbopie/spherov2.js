"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_hid_1 = require("node-hid");
var Buttons;
(function (Buttons) {
    Buttons[Buttons["A"] = 4] = "A";
    Buttons[Buttons["B"] = 5] = "B";
    Buttons[Buttons["X"] = 6] = "X";
    Buttons[Buttons["Y"] = 7] = "Y";
    Buttons[Buttons["LeftStickY"] = 14] = "LeftStickY";
    Buttons[Buttons["LeftStickX"] = 13] = "LeftStickX";
    Buttons[Buttons["RightStickY"] = 16] = "RightStickY";
    Buttons[Buttons["RightStickX"] = 15] = "RightStickX";
    Buttons[Buttons["R2"] = 11] = "R2";
    Buttons[Buttons["L2"] = 10] = "L2";
})(Buttons || (Buttons = {}));
const MAX_D_PAD = 127;
const devs = node_hid_1.devices();
const deviceInfo = devs.find((d) => d.vendorId === 273 && d.productId === 5152);
if (!deviceInfo) {
    // tslint:disable-next-line:no-console
    console.error('Could not find device in device list');
    process.exit(1);
}
const device = new node_hid_1.HID(deviceInfo.path);
const calculate = ({ xRaw, yRaw }) => {
    const x = xRaw / MAX_D_PAD;
    const y = yRaw / MAX_D_PAD;
    const module = Math.sqrt(x * x + y * y);
    let angle = (Math.atan(y / x) * (180 / Math.PI)) * -1 + 90;
    if (x < 0) {
        angle += 180;
    }
    return {
        xRaw,
        yRaw,
        x,
        y,
        module: module > 1 ? 1 : module,
        angle,
    };
};
let state;
let cb = (_state) => { return; };
// looks like buttons have intensity yay!
device.on('data', (data) => {
    state = {
        a: data.readUInt8(Buttons.A),
        b: data.readUInt8(Buttons.B),
        x: data.readUInt8(Buttons.X),
        y: data.readUInt8(Buttons.Y),
        leftStick: {
            xRaw: data.readInt8(Buttons.LeftStickX),
            yRaw: data.readInt8(Buttons.LeftStickY),
            x: 0,
            y: 0,
            module: 0,
            angle: 0,
        },
        rightStick: {
            xRaw: data.readInt8(Buttons.RightStickX),
            yRaw: data.readInt8(Buttons.RightStickY),
            x: 0,
            y: 0,
            module: 0,
            angle: 0,
        },
        r2: data.readUInt8(Buttons.R2),
        l2: data.readUInt8(Buttons.L2),
    };
    state.leftStick = calculate(state.leftStick);
    state.rightStick = calculate(state.rightStick);
    cb(state);
});
device.on('error', (err) => {
    // tslint:disable-next-line:no-console
    console.error('error:', err);
});
exports.default = {
    close() {
        device.close();
    },
    onChanged(fn) {
        cb = fn;
    },
    getState() {
        return state;
    },
};
