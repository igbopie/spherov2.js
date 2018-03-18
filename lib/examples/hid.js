"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const hid_1 = require("./lib/hid");
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        hid_1.hid(sphero);
    }
};
main();
