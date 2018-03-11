"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const MINIMUN_PACKET_LENGTH = 6;
const classifyPacket = (packet) => {
    const [startPacket, flags, deviceId, commandId, sequenceNumber, ...rest] = packet;
    const payload = rest.slice(0, rest.length - 3);
    const [checksum, endPacket] = rest.slice(rest.length - 2, rest.length - 1);
    return {
        // flags, // TODO
        deviceId,
        commandId,
        sequenceNumber,
        payload,
        raw: packet
    };
};
function factory(callback) {
    let msg = [];
    let checksum = 0;
    let isEscaping = false;
    const init = () => {
        msg = [];
        checksum = 0;
        isEscaping = false;
    };
    const error = (msg) => {
        init();
        callback(msg);
    };
    return {
        add(byte) {
            switch (byte) {
                case types_1.APIConstants.startOfPacket:
                    if (msg.length !== 0) {
                        init();
                        return callback('Invalid first byte');
                    }
                    return msg.push(byte);
                case types_1.APIConstants.endOfPacket:
                    if (msg.length === 0 || msg.length < MINIMUN_PACKET_LENGTH) {
                        return error('Invalid last byte ' + msg.length);
                    }
                    if (checksum !== 0xFF) {
                        return error('Invalid checksum');
                    }
                    msg.push(byte);
                    callback(undefined, classifyPacket(new Uint8Array(msg)));
                    return init();
                case types_1.APIConstants.escape:
                    if (isEscaping) {
                        return error('Invalid escape char position');
                    }
                    isEscaping = true;
                    return;
                case types_1.APIConstants.escapedStartOfPacket:
                case types_1.APIConstants.escapedEndOfPacket:
                case types_1.APIConstants.escapedEscape:
                    if (isEscaping) {
                        byte = byte | types_1.APIConstants.escapeMask;
                        isEscaping = false;
                    }
            }
            if (isEscaping) {
                return error('Invalid no escape char end found');
            }
            msg.push(byte);
            checksum = checksum & byte | 0xFF;
        }
    };
}
exports.factory = factory;
