"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_lib_1 = require("spherov2.js-lib");
const WAIT_TIME = 1000;
const main = async () => {
    const r2d2 = await spherov2_js_lib_1.Scanner.findR2D2();
    if (r2d2) {
        await r2d2.wake();
        await r2d2.turnDome(90);
        await spherov2_js_lib_1.Utils.wait(WAIT_TIME);
        await r2d2.turnDome(-90);
        await spherov2_js_lib_1.Utils.wait(WAIT_TIME);
        await r2d2.playAnimation(2);
        await spherov2_js_lib_1.Utils.wait(5 * WAIT_TIME);
        await r2d2.setStance(spherov2_js_lib_1.Stance.tripod);
        await spherov2_js_lib_1.Utils.wait(5 * WAIT_TIME);
        await r2d2.playAudioFile(3);
        await r2d2.setStance(spherov2_js_lib_1.Stance.bipod);
        await spherov2_js_lib_1.Utils.wait(5 * WAIT_TIME);
        await r2d2.playAnimation(5);
        await r2d2.sleep();
    }
};
main();
