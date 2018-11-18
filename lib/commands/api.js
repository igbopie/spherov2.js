"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.apiProcessor);
    return {
        echo: () => encode({
            commandId: types_1.APIProcessCommandIds.echo
        })
    };
};
