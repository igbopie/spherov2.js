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
const utils_1 = require("../utils");
const PATROL_TIME = 2000;
const WAIT_TIME = 2000;
const SPEED = 100;
exports.default = (toy) => __awaiter(this, void 0, void 0, function* () {
    while (true) {
        yield toy.rollTime(SPEED, 270, PATROL_TIME, []);
        yield utils_1.wait(WAIT_TIME);
        yield toy.rollTime(SPEED, 0, PATROL_TIME, []);
        yield utils_1.wait(WAIT_TIME);
        yield toy.rollTime(SPEED, 90, PATROL_TIME, []);
        yield utils_1.wait(WAIT_TIME);
        yield toy.rollTime(SPEED, 180, PATROL_TIME, []);
        yield utils_1.wait(WAIT_TIME);
    }
});
