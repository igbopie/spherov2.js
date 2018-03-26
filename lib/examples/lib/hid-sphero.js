"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nimbus_1 = require("./nimbus");
const utils_1 = require("../../utils");
let state;
nimbus_1.default.onChanged((_state) => {
    state = _state;
});
// SORRY FOR THIS CODE, It is my playground for now
exports.hid = async (toy) => {
    let calibrating = false;
    let offset = 0;
    let stopped = false;
    let heading;
    const loop = async () => {
        while (true) {
            if (state) {
                const { angle, module } = state.leftStick;
                const currentSpeed = module * 255;
                heading = isNaN(angle) ? heading : angle;
                if (state.rightStick.angle >= 0 && state.rightStick.module > 0.8) {
                    toy.setBackLedIntensity(255);
                    offset = state.rightStick.angle;
                    calibrating = true;
                }
                else if (calibrating) {
                    toy.setBackLedIntensity(0);
                    calibrating = false;
                }
                if (currentSpeed > 0) {
                    stopped = false;
                }
                if (!stopped || calibrating) {
                    toy.roll(calibrating ? 0 : currentSpeed, calibrating ? offset : (heading + offset) % 360, []);
                    if (currentSpeed === 0) {
                        stopped = true;
                    }
                }
            }
            await utils_1.wait(80);
        }
    };
    await loop();
};
