"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_1 = require("spherov2.js");
const nimbus_sphero_1 = require("./utils/nimbus-sphero");
const main = async () => {
    const sphero = await spherov2_js_1.Scanner.findSpheroMini();
    if (sphero) {
        nimbus_sphero_1.hid(sphero);
    }
};
main();
