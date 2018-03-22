"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("./lib/scanner");
const utils_1 = require("../utils");
const core_1 = require("../toys/core");
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        await sphero.configureSensorStream();
        sphero.on(core_1.Event.onSensor, (command) => {
            const line = command.payload.map((i) => `${i}`.padStart(3, '0')).join(' ');
            // tslint:disable-next-line:no-console
            console.log('Sensor Read', line);
        });
        while (true) {
            await utils_1.wait(1000);
        }
    }
};
main();
