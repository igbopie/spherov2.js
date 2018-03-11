"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("../utils");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.driving);
    return {
        drive: (speed, heading, flags) => encode({
            payload: [
                speed,
                heading >> 8 & 0xff,
                heading & 0xff,
                utils_1.combineFlags(flags)
            ],
            commandId: types_1.DrivingCommandIds.driveWithHeading,
        })
    };
};
