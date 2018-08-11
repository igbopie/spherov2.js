"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const hid_lm_1 = require("./lib/hid-lm");
const main = async () => {
    const lm = await scanner_1.findLightningMcQueen();
    if (lm) {
        hid_lm_1.hid(lm);
    }
};
main();
