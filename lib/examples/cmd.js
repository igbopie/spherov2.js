"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const scanner_1 = require("./lib/scanner");
// SORRY FOR THIS CODE, It is my playground for now
const cmdPlay = (toy) => {
    let pressTimeout;
    let heading = 0;
    let currentSpeed = 0;
    let speed = 150;
    let executing = true;
    let calibrating = false;
    let offset = 0;
    const cancelPress = () => {
        clearTimeout(pressTimeout);
        pressTimeout = null;
    };
    const addTimeout = () => {
        pressTimeout = setTimeout(() => {
            currentSpeed = 0;
        }, 500);
    };
    const loop = async () => {
        while (true) {
            if (executing) {
                toy.roll(currentSpeed, calibrating ? heading : (heading + offset) % 360, []);
            }
            if (currentSpeed === 0 && !calibrating) {
                executing = false;
            }
            if (calibrating) {
                heading += 5;
                if (heading > 360) {
                    heading = 0;
                }
            }
            await utils_1.wait(100);
        }
    };
    const handle = async (key = '', symbol = {}) => {
        cancelPress();
        if (symbol.name === 'up') {
            heading = 0;
            currentSpeed = speed;
            executing = true;
            addTimeout();
        }
        else if (symbol.name === 'left') {
            heading = 270;
            currentSpeed = speed;
            executing = true;
            addTimeout();
        }
        else if (symbol.name === 'right') {
            heading = 90;
            currentSpeed = speed;
            executing = true;
            addTimeout();
        }
        else if (symbol.name === 'down') {
            heading = 180;
            currentSpeed = speed;
            executing = true;
            addTimeout();
        }
        if (key === 'q') {
            speed += 10;
            // console.log('speed', speed);
        }
        else if (key === 'z') {
            speed -= 10;
            // console.log('speed', speed);
        }
        else if (key === 'p') {
            process.exit();
        }
        else if (key === 's') {
            toy.sleep();
        }
        else if (key === 'a') {
            toy.wake();
        }
        else if (key === 'c') {
            if (calibrating) {
                calibrating = false;
                await toy.setBackLedIntensity(0);
                offset = heading;
                heading = 0;
            }
            else {
                await toy.setBackLedIntensity(255);
                currentSpeed = 0;
                executing = true;
                heading = 0;
                calibrating = true;
            }
        }
    };
    const readline = require('readline');
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', handle);
    loop();
};
const main = async () => {
    const sphero = await scanner_1.findSpheroMini();
    if (sphero) {
        cmdPlay(sphero);
    }
};
main();
