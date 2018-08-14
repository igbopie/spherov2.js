"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sphero_mini_1 = require("../toys/sphero-mini");
const utils_1 = require("../utils");
const scanner_1 = require("./lib/scanner");
// import * as noble from 'noble';
const WAIT_TIME = 100;
exports.setEachMiniColor = async (minis, r, g, b) => {
    for (const mini of minis) {
        await mini.setMainLedColor(r, g, b);
        await utils_1.wait(WAIT_TIME);
    }
};
exports.ensemble = async (minis) => {
    // Cycle 10 times. On each cycle set each bot to white, green, then red.
    for (let i = 0; i < 10; i++) {
        // set each mini's color to white
        await exports.setEachMiniColor(minis, 0xFF, 0xFF, 0xFF);
        // set each mini's color to green
        await exports.setEachMiniColor(minis, 0, 0xFF, 0);
        // set each mini's color to red
        await exports.setEachMiniColor(minis, 0xFF, 0, 0);
    }
    // Put each mini to sleep
    for (const mini of minis) {
        await mini.sleep();
    }
    process.exit();
};
const main = async () => {
    // Find all bots that advertise as a Sphero Mini
    const bots = await scanner_1.findToys([sphero_mini_1.SpheroMini.advertisement]);
    // sort the minis by their bluetooth advertisment local name (e.g, "SM-????")
    bots.sort((a, b) => {
        if (a.peripheral.advertisement.localName < b.peripheral.advertisement.localName) {
            return -1;
        }
        else if (a.peripheral.advertisement.localName > b.peripheral.advertisement.localName) {
            return 1;
        }
        return 0;
    });
    // start each bot, cast it to a SpheroMini object, then add to an array
    const minis = [];
    for (const bot of bots) {
        // cast bot to a Core object
        const toy = new sphero_mini_1.SpheroMini.advertisement.class(bot.peripheral);
        await toy.start();
        await toy.wake();
        // cast Core toy to a SpheroMini
        const mini = toy;
        minis.push(mini);
    }
    // run the ensemble action on the array of minis
    exports.ensemble(minis);
};
main();
