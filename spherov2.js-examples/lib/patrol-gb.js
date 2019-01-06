"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_lib_1 = require("spherov2.js-lib");
const patrol_1 = require("./utils/patrol");
const main = async () => {
    const sphero = await spherov2_js_lib_1.Scanner.findBB9E();
    if (sphero) {
        patrol_1.patrol(sphero);
    }
};
main();
