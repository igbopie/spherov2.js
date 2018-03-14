"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-unused-variable
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.somethingAPI);
    return {
        something5: () => encode({
            commandId: types_1.SomethingApi.something5,
        }),
    };
};
