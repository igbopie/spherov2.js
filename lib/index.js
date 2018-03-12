"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const toy_1 = require("./toy");
const scanner_1 = require("./scanner");
// import cmdPlay from './examples/cmd-play';
// import patrol from './examples/patrol';
const main = async () => {
    const discovered = await scanner_1.findToys();
    if (discovered.length > 0) {
        const toy = new toy_1.Toy(discovered[0].peripheral);
        console.log('Starting...');
        await toy.start();
        console.log('Started');
        let version = await toy.appVersion();
        console.log('Version', version);
        //patrol(toy);
        process.exit(0);
    }
    else {
        console.log('Not found');
    }
};
main();
//# sourceMappingURL=index.js.map