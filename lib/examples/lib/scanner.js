"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noble = require("noble");
const sphero_mini_1 = require("../../toys/sphero-mini");
const utils_1 = require("../../utils");
const validToys = [
    sphero_mini_1.SpheroMini.advertisement,
];
const discover = async (toys, p) => {
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
exports.findToys = async () => {
    const toys = [];
    // tslint:disable-next-line:no-console
    console.log('Scanning devices...');
    noble.on('discover', discover.bind(this, toys));
    noble.startScanning(); // any service UUID, no duplicates
    await utils_1.wait(5000);
    noble.stopScanning();
    noble.removeListener('discover', discover.bind(this, toys));
    // tslint:disable-next-line:no-console
    console.log('Done scanning devices.');
    return toys;
};
exports.findSpheroMini = async () => {
    const discovered = await exports.findToys();
    if (discovered.length > 0) {
        const toy = new sphero_mini_1.SpheroMini(discovered[0].peripheral);
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
