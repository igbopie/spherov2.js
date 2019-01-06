"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_lib_1 = require("spherov2.js-lib");
const hid_lm_1 = require("./utils/hid-lm");
const main = async () => {
    const lm = await spherov2_js_lib_1.Scanner.findLightningMcQueen();
    if (lm) {
        hid_lm_1.hid(lm);
    }
};
main();
