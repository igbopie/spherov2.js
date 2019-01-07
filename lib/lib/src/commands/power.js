"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.powerInfo);
    return {
        batteryVoltage: () => encode({
            commandId: types_1.PowerCommandIds.batteryVoltage
        }),
        sleep: () => encode({
            commandId: types_1.PowerCommandIds.sleep
        }),
        something2: () => encode({
            commandId: types_1.PowerCommandIds.something2
        }),
        something3: () => encode({
            commandId: types_1.PowerCommandIds.something3
        }),
        something4: () => encode({
            commandId: types_1.PowerCommandIds.something4
        }),
        wake: () => encode({
            commandId: types_1.PowerCommandIds.wake
        })
    };
};
