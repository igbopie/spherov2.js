"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const noble = require("noble");
const utils_1 = require("./utils");
const ValidToys = [
    // {
    //   prefix: 'LM-',
    //   name: 'Lighting McQueen'
    // },
    {
        prefix: 'SM-',
        name: 'Sphero Mini'
    }
];
const discover = (toys, p) => __awaiter(this, void 0, void 0, function* () {
    const { advertisement, uuid } = p;
    const { localName = '' } = advertisement;
    ValidToys.forEach((ToyAdvertisement) => __awaiter(this, void 0, void 0, function* () {
        if (localName.indexOf(ToyAdvertisement.prefix) === 0) {
            console.log(`Detected ${ToyAdvertisement.name}: ${uuid}`);
            toys.push(Object.assign({}, ToyAdvertisement, { peripheral: p }));
        }
    }));
});
exports.findToys = () => __awaiter(this, void 0, void 0, function* () {
    const toys = [];
    console.log('Scanning devices...');
    noble.on('discover', discover.bind(this, toys));
    noble.startScanning(); // any service UUID, no duplicates
    yield utils_1.wait(5000);
    noble.stopScanning();
    noble.removeListener('discover', discover.bind(this, toys));
    console.log('Done scanning devices.');
    return toys;
});
