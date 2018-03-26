"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const hid_sphero_1 = require("./lib/hid-sphero");
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        hid_sphero_1.hid(sphero);
    }
};
main();
