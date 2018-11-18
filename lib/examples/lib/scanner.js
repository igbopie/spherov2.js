"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const bb9e_1 = require("../../toys/bb9e");
const r2d2_1 = require("../../toys/r2d2");
const lightning_mcqueen_1 = require("../../toys/lightning-mcqueen");
const sphero_mini_1 = require("../../toys/sphero-mini");
const noble = require("noble");
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
            toys.push(Object.assign({}, toyAdvertisement, { peripheral: p }));
            // tslint:disable-next-line:no-console
            console.log(`name: ${toyAdvertisement.name}, uuid: ${uuid}, mac-address: ${p.address}`);
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
const startToy = async (toy) => {
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
    console.log('Battery', battery);
};
exports.find = async (toyType, name) => {
    const discovered = await exports.findToys([toyType]);
    const discoveredItem = discovered.find(item => item.peripheral.advertisement.localName === name) ||
        discovered[0];
    if (!discoveredItem) {
        // tslint:disable-next-line:no-console
        console.log('Not found');
    }
    const toy = new toyType.class(discoveredItem.peripheral);
    await startToy(toy);
    return toy;
};
exports.findAll = async (toyType) => {
    const discovered = await exports.findToys([toyType]);
    if (discovered.length > 0) {
        // Init toys and return array
        return await discovered.reduce(async (promise, item) => {
            const toyArray = await promise;
            const toy = new toyType.class(item.peripheral);
            await startToy(toy);
            return [...toyArray, toy];
        }, Promise.resolve([]));
    }
    else {
        // tslint:disable-next-line:no-console
        console.log('Not found');
    }
};
exports.findBB9E = async () => {
    return (await exports.find(bb9e_1.BB9E.advertisement));
};
exports.findR2D2 = async () => {
    return (await exports.find(r2d2_1.R2D2.advertisement));
};
exports.findSpheroMini = async () => {
    return (await exports.find(sphero_mini_1.SpheroMini.advertisement));
};
exports.findSpheroMiniByName = async (name) => {
    return (await exports.find(sphero_mini_1.SpheroMini.advertisement, name));
};
exports.findAllSpheroMini = async () => {
    return (await exports.findAll(sphero_mini_1.SpheroMini.advertisement));
};
exports.findLightningMcQueen = async () => {
    return (await exports.find(lightning_mcqueen_1.LightningMcQueen.advertisement));
};
