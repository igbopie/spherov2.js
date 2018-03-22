"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const scanner_1 = require("./lib/scanner");
const core_1 = require("../toys/core");
const beep = async (sphero) => {
    await sphero.setMainLedColor(0xFF, 0, 0);
    await utils_1.wait(100);
    await sphero.setMainLedColor(0, 0, 0);
    await utils_1.wait(100);
    await sphero.setMainLedColor(0xFF, 0, 0);
    await utils_1.wait(100);
    await sphero.setMainLedColor(0, 0, 0);
    await utils_1.wait(100);
    await sphero.setMainLedColor(0xFF, 0xFF, 0xFF);
};
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        await sphero.configureCollisionDetection();
        sphero.on(core_1.Event.onCollision, () => {
            // tslint:disable-next-line:no-console
            console.log('COLLISION');
            beep(sphero);
        });
        while (true) {
            await utils_1.wait(1000);
        }
    }
};
main();
