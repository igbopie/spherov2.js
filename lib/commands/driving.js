"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
// tslint:disable-next-line:no-unused-variable
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.driving);
    return {
        drive: (speed, heading, flags) => encode({
            commandId: types_1.DrivingCommandIds.driveWithHeading,
            payload: [
                speed,
                // tslint:disable-next-line:no-bitwise
                heading >> 8 & 0xff,
                // tslint:disable-next-line:no-bitwise
                heading & 0xff,
                utils_1.combineFlags(flags),
            ],
        }),
    };
};
