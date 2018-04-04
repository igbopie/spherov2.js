"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const nimbus_sphero_1 = require("./lib/nimbus-sphero");
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        nimbus_sphero_1.hid(sphero);
    }
};
main();
