"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_lib_1 = require("spherov2.js-lib");
const WAIT_TIME = 100;
exports.police = async (toy) => {
    while (true) {
        await toy.setMainLedColor(0xFF, 0, 0);
        await spherov2_js_lib_1.Utils.wait(WAIT_TIME);
        await toy.setMainLedColor(0, 0, 0xFF);
        await spherov2_js_lib_1.Utils.wait(WAIT_TIME);
    }
};
const main = async () => {
    const sphero = await spherov2_js_lib_1.Scanner.findSpheroMini();
    if (sphero) {
        exports.police(sphero);
    }
};
main();
