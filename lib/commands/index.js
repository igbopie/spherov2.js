"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const driving_1 = require("./driving");
const encoder_1 = require("./encoder");
const power_1 = require("./power");
const system_info_1 = require("./system-info");
const sequencer = () => {
    let s = 0;
    return () => {
        const temp = s;
        s += 1;
        return temp;
    };
};
exports.factory = () => {
    const getSequence = sequencer();
    const gen = (deviceId) => (part) => encoder_1.encode(Object.assign({}, part, { deviceId, sequenceNumber: getSequence() }));
    return {
        api: api_1.default(gen),
        driving: driving_1.default(gen),
        power: power_1.default(gen),
        systemInfo: system_info_1.default(gen),
    };
};
//# sourceMappingURL=index.js.map