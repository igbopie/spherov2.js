"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noble = require("noble");
const sphero_mini_1 = require("../../toys/sphero-mini");
const utils_1 = require("../../utils");
const lighting_mcqueen_1 = require("../../toys/lighting-mcqueen");
// const validToys: IToyAdvertisement[] = [
//   SpheroMini.advertisement,
//   // {
//   //   prefix: 'LM-',
//   //   name: 'Lighting McQueen'
//   // },
// ];
const discover = async (validToys, toys, p) => {
    const { advertisement, uuid } = p;
    const { localName = '' } = advertisement;
    validToys.forEach(async (toyAdvertisement) => {
        if (localName.indexOf(toyAdvertisement.prefix) === 0) {
            // tslint:disable-next-line:no-console
            console.log(`Detected ${toyAdvertisement.name}: ${uuid}`);
            toys.push(Object.assign({}, toyAdvertisement, { peripheral: p }));
        }
    });
};
exports.findToys = async (toysType) => {
    const toys = [];
    // tslint:disable-next-line:no-console
    console.log('Scanning devices...');
    const discoverBinded = discover.bind(this, toysType, toys);
    noble.on('discover', discoverBinded);
    noble.startScanning(); // any service UUID, no duplicates
    await utils_1.wait(5000);
    noble.stopScanning();
    noble.removeListener('discover', discoverBinded);
    // tslint:disable-next-line:no-console
    console.log('Done scanning devices.');
    return toys;
};
exports.find = async (toyType) => {
    const discovered = await exports.findToys([toyType]);
    if (discovered.length > 0) {
        const toy = new toyType.class(discovered[0].peripheral);
        // tslint:disable-next-line:no-console
        console.log('Starting...');
        await toy.start();
        // tslint:disable-next-line:no-console
        console.log('Started');
        const version = await toy.appVersion();
        // tslint:disable-next-line:no-console
        console.log('Version', version);
        const battery = await toy.batteryVoltage();
        // tslint:disable-next-line:no-console
        console.log(battery);
        return toy;
    }
    else {
        // tslint:disable-next-line:no-console
        console.log('Not found');
    }
};
exports.findSpheroMini = async () => {
    return await exports.find(sphero_mini_1.SpheroMini.advertisement);
};
exports.findLightintMcQueen = async () => {
    return await exports.find(lighting_mcqueen_1.LightingMcQueen.advertisement);
};
