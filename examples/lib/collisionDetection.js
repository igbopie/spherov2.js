"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spherov2_js_1 = require("spherov2.js");
const beep = async (sphero) => {
    await sphero.setMainLedColor(0xFF, 0, 0);
    await spherov2_js_1.Utils.wait(100);
    await sphero.setMainLedColor(0, 0, 0);
    await spherov2_js_1.Utils.wait(100);
    await sphero.setMainLedColor(0xFF, 0, 0);
    await spherov2_js_1.Utils.wait(100);
    await sphero.setMainLedColor(0, 0, 0);
    await spherov2_js_1.Utils.wait(100);
    await sphero.setMainLedColor(0xFF, 0xFF, 0xFF);
};
const main = async () => {
    const sphero = await spherov2_js_1.Scanner.findSpheroMini();
    if (sphero) {
        await sphero.configureCollisionDetection();
        sphero.on(spherov2_js_1.Event.onCollision, () => {
            // tslint:disable-next-line:no-console
            console.log('COLLISION');
            beep(sphero);
        });
        while (true) {
            await spherov2_js_1.Utils.wait(1000);
        }
    }
};
main();
