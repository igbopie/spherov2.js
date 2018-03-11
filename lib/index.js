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
const toy_1 = require("./toy");
const scanner_1 = require("./scanner");
const main = () => __awaiter(this, void 0, void 0, function* () {
    const discovered = yield scanner_1.findToys();
    if (discovered.length > 0) {
        const toy = new toy_1.Toy(discovered[0].peripheral);
        console.log('Starting...');
        yield toy.start();
        console.log('Started');
        yield toy.appVersion();
        console.log('Version');
        // patrol(toy);
    }
    else {
        console.log('Not found');
    }
});
main();
