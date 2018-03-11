"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.powerInfo);
    return {
        wake: () => encode({
            commandId: types_1.PowerCommandIds.wake,
        }),
        sleep: () => encode({
            commandId: types_1.PowerCommandIds.sleep,
        })
    };
};
