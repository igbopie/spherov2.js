"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noble = require("noble");
const utils_1 = require("../../utils");
const bb9e_1 = require("../../toys/bb9e");
const lightning_mcqueen_1 = require("../../toys/lightning-mcqueen");
const sphero_mini_1 = require("../../toys/sphero-mini");
// const validToys: IToyAdvertisement[] = [
//   SpheroMini.advertisement,
//   // {
//   //   prefix: 'LM-',
//   //   name: 'Lightning McQueen'
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
exports.findBB9E = async () => {
    return await exports.find(bb9e_1.BB9E.advertisement);
};
exports.findSpheroMini = async () => {
    return await exports.find(sphero_mini_1.SpheroMini.advertisement);
};
exports.findLightningMcQueen = async () => {
    return await exports.find(lightning_mcqueen_1.LightningMcQueen.advertisement);
};
