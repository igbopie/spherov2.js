"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-unused-variable
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.powerInfo);
    return {
        batteryVoltage: () => encode({
            commandId: types_1.PowerCommandIds.batteryVoltage,
        }),
        sleep: () => encode({
            commandId: types_1.PowerCommandIds.sleep,
        }),
        wake: () => encode({
            commandId: types_1.PowerCommandIds.wake,
        }),
    };
};
