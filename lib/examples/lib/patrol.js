"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const PATROL_TIME = 2000;
const WAIT_TIME = 2000;
const SPEED = 100;
exports.patrol = async (toy) => {
    while (true) {
        await toy.rollTime(SPEED, 270, PATROL_TIME, []);
        await utils_1.wait(WAIT_TIME);
        await toy.rollTime(SPEED, 0, PATROL_TIME, []);
        await utils_1.wait(WAIT_TIME);
        await toy.rollTime(SPEED, 90, PATROL_TIME, []);
        await utils_1.wait(WAIT_TIME);
        await toy.rollTime(SPEED, 180, PATROL_TIME, []);
        await utils_1.wait(WAIT_TIME);
    }
};
