"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const patrol_1 = require("./lib/patrol");
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        patrol_1.patrol(sphero);
    }
};
main();
