"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-unused-variable
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.userIO);
    return {
        allLEDsRaw: (payload) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload,
        }),
        setBackLedIntensity: (i) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x01, i],
        }),
        setMainLedBlueIntensity: (b) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x08, b],
        }),
        setMainLedColor: (r, g, b) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x70, r, g, b],
        }),
        setMainLedGreenIntensity: (g) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x04, g],
        }),
        setMainLedRedIntensity: (r) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x02, r],
        }),
    };
};
