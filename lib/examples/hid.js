"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nimbus_1 = require("./lib/nimbus");
const utils_1 = require("../utils");
let state;
nimbus_1.default.onChanged((_state) => {
    state = _state;
});
// SORRY FOR THIS CODE, It is my playground for now
exports.default = (toy) => {
    let calibrating = false;
    let offset = 0;
    const loop = async () => {
        while (true) {
            if (state) {
                const heading = state.leftStick.angle;
                const currentSpeed = state.leftStick.module * 255;
                if (state.rightStick.angle >= 0) {
                    toy.setBackLedIntensity(255);
                    offset = state.rightStick.angle;
                    calibrating = true;
                }
                else {
                    toy.setBackLedIntensity(0);
                    calibrating = false;
                }
                toy.roll(currentSpeed, calibrating ? offset : (heading + offset) % 360, []);
            }
            await utils_1.wait(80);
        }
    };
    loop();
};
