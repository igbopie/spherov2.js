"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const scanner_1 = require("./lib/scanner");
const WAIT_TIME = 100;
exports.police = async (toy) => {
    while (true) {
        await toy.setMainLedColor(0xFF, 0, 0);
        await utils_1.wait(WAIT_TIME);
        await toy.setMainLedColor(0, 0, 0xFF);
        await utils_1.wait(WAIT_TIME);
    }
};
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        exports.police(sphero);
    }
};
main();
