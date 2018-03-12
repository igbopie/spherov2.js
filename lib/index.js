"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const sphero_mini_1 = require("./toys/sphero-mini");
const scanner_1 = require("./scanner");
// import cmdPlay from './examples/cmd-play';
const patrol_1 = require("./examples/patrol");
const main = async () => {
    const discovered = await scanner_1.findToys();
    if (discovered.length > 0) {
        const toy = new sphero_mini_1.SpheroMini(discovered[0].peripheral);
        console.log('Starting...');
        await toy.start();
        console.log('Started');
        let version = await toy.appVersion();
        console.log('Version', version);
        let battery = await toy.batteryVoltage();
        console.log(battery);
        patrol_1.default(toy);
        // process.exit(0);
    }
    else {
        console.log('Not found');
    }
};
main();
//# sourceMappingURL=index.js.map