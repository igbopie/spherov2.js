"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.systemInfo);
    return {
        appVersion: () => encode({
            commandId: types_1.SystemInfoCommandIds.mainApplicationVersion
        }),
        something: () => encode({
            commandId: types_1.SystemInfoCommandIds.something // Maybe voltages??
        }),
        something6: () => encode({
            commandId: types_1.SystemInfoCommandIds.something6 // Maybe voltages??
        }),
        something7: () => encode({
            commandId: types_1.SystemInfoCommandIds.something7 // Maybe voltages??
        })
    };
};
