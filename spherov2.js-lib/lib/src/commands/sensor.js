"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.sensor);
    return {
        enableCollisionAsync: () => encode({
            commandId: types_1.SensorCommandIds.enableCollisionAsync
        }),
        /**
         * @param  {number} xThreshold An 8-bit settable threshold for the X (left/right)
         * and Y (front/back) axes of Sphero. A value of 00h disables the contribution of that axis.
         * @param  {number} yThreshold An 8-bit settable threshold for the X (left/right)
         * and Y (front/back) axes of Sphero. A value of 00h disables the contribution of that axis.
         * @param  {number} xSpeed An 8-bit settable speed value for the X and Y axes.
         * This setting is ranged by the speed, then added to Xt, Yt to generate the final threshold value.
         * @param  {number} ySpeed An 8-bit settable speed value for the X and Y axes.
         * This setting is ranged by the speed, then added to Xt, Yt to generate the final threshold value.
         * @param  {number} deadTime An 8-bit post-collision dead time to prevent retriggering; specified in 10ms increments.
         * @param  {number=0x01} method Detection method type to use. Currently the only method
         * supported is 01h. Use 00h to completely disable this service.
         */
        configureCollision: (xThreshold, yThreshold, xSpeed, ySpeed, deadTime, method = 0x01) => encode({
            commandId: types_1.SensorCommandIds.configureCollision,
            payload: [method, xThreshold, xSpeed, yThreshold, ySpeed, deadTime]
        }),
        sensorMask: (payload) => encode({
            commandId: types_1.SensorCommandIds.sensorMask,
            payload
        }),
        sensor1: () => encode({
            commandId: types_1.SensorCommandIds.sensor1,
            payload: [0x01]
        }),
        sensor2: () => encode({
            commandId: types_1.SensorCommandIds.sensor2,
            payload: [0x00]
        }),
        configureSensorStream: () => encode({
            commandId: types_1.SensorCommandIds.configureSensorStream,
            payload: [0x03, 0x80, 0x00, 0x00]
            // x00 0000 0000 nada
            // x10 0001 0000 nada
            // x20 0010 0000 stream (4 bytes)
            // x30 0011 0000 nada
            // x40 0100 0000 stream (4 bytes)
            // x50 0101 0000 nada
            // x60 0110 0000 stream (mas bytes)
            // x70 0111 0000 nada
            // x80 1000 0000 stream 4bytes
            // x90 1001 0000 nada
            // xa0 1010 0000 stream mas bytes
            // xb0 1011 0000 nada
            // xc0 1100 0000 stream mas bytes
            // xd0 1101 0000 nada
            // xe0 1110 0000 mas bytes
            // xf0 1111 0000 nada
        })
    };
};
