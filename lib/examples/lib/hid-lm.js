"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nimbus_1 = require("./nimbus");
const utils_1 = require("../../utils");
let state;
nimbus_1.default.onChanged((_state) => {
    state = _state;
});
exports.default = nimbus_1.default;
// SORRY FOR THIS CODE, It is my playground for now
exports.hid = async (toy) => {
    // let stopped = false;
    let heading;
    const loop = async () => {
        while (true) {
            if (state) {
                const { x } = state.leftStick;
                const pos = state.r2 / 255;
                const neg = -1 * state.l2 / 255;
                // const currentSpeed = module * 255;
                heading = isNaN(x) ? 0 : x;
                // if (currentSpeed > 0) {
                //   stopped = false;
                // }
                // console.log(pos + neg);
                toy.driveAsRc(heading, pos + neg);
                // if (currentSpeed === 0) {
                //   stopped = true;
                // }
            }
            await utils_1.wait(80);
        }
    };
    await loop();
};
