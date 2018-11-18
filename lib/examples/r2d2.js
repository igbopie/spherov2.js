"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const scanner_1 = require("./lib/scanner");
const types_1 = require("../toys/types");
const WAIT_TIME = 1000;
const main = async () => {
    const r2d2 = await scanner_1.findR2D2();
    if (r2d2) {
        await r2d2.wake();
        await r2d2.turnDome(90);
        await utils_1.wait(WAIT_TIME);
        await r2d2.turnDome(-90);
        await utils_1.wait(WAIT_TIME);
        await r2d2.playAnimation(2);
        await utils_1.wait(5 * WAIT_TIME);
        await r2d2.setStance(types_1.Stance.tripod);
        await utils_1.wait(5 * WAIT_TIME);
        await r2d2.playAudioFile(3);
        await r2d2.setStance(types_1.Stance.bipod);
        await utils_1.wait(5 * WAIT_TIME);
        await r2d2.playAnimation(5);
        await r2d2.sleep();
    }
};
main();
