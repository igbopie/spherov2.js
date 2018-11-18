"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const driving_1 = require("./driving");
const encoder_1 = require("./encoder");
const power_1 = require("./power");
const something_api_1 = require("./something-api");
const system_info_1 = require("./system-info");
const sensor_1 = require("./sensor");
const types_1 = require("./types");
const user_io_1 = require("./user-io");
const sequencer = () => {
    let s = 0;
    return () => {
        const temp = s;
        s += 1;
        if (s >= 255) {
            s = 0;
        }
        return temp;
    };
};
exports.factory = (seq) => {
    const getSequence = seq || sequencer();
    const gen = (deviceId) => (part) => encoder_1.encode(Object.assign({}, part, { commandFlags: [types_1.Flags.requestsResponse, types_1.Flags.resetsInactivityTimeout], deviceId, sequenceNumber: getSequence() }));
    return {
        api: api_1.default(gen),
        driving: driving_1.default(gen),
        power: power_1.default(gen),
        somethingApi: something_api_1.default(gen),
        systemInfo: system_info_1.default(gen),
        userIo: user_io_1.default(gen),
        sensor: sensor_1.default(gen)
    };
};
