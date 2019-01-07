"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const types_1 = require("./types");
const encodeNumberLM = (n) => {
    const absN = Math.abs(n * 3968);
    const nFirstHalfByte1 = n === 0 ? 0 : n > 0 ? 0x30 : 0xb0;
    // tslint:disable-next-line:no-bitwise
    const nSecondHalfByte1 = (absN >> 8) & 0x0f;
    return [
        // tslint:disable-next-line:no-bitwise
        nFirstHalfByte1 | nSecondHalfByte1,
        // tslint:disable-next-line:no-bitwise
        absN & 0xff,
        // tslint:disable-next-line:no-bitwise
        (0 >> 8) & 0xff,
        // tslint:disable-next-line:no-bitwise
        0 & 0xff
    ];
};
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.driving);
    return {
        drive: (speed, heading, flags) => encode({
            commandId: types_1.DrivingCommandIds.driveWithHeading,
            payload: [
                speed,
                // tslint:disable-next-line:no-bitwise
                (heading >> 8) & 0xff,
                // tslint:disable-next-line:no-bitwise
                heading & 0xff,
                utils_1.combineFlags(flags)
            ]
        }),
        driveAsRc: (heading, speed) => encode({
            // Value: 8d 08 16 02 8b bf 72 93 de 00 00 00 00 b2 d8
            commandId: types_1.DrivingCommandIds.driveAsRc,
            payload: [...encodeNumberLM(heading), ...encodeNumberLM(speed)]
        })
    };
};
