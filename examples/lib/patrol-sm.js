"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_1 = require("spherov2.js");
const patrol_1 = require("./utils/patrol");
const main = async () => {
    const sphero = await spherov2_js_1.Scanner.findSpheroMini();
    if (sphero) {
        patrol_1.patrol(sphero);
    }
};
main();
