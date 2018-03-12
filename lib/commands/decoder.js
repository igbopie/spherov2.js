"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const MINIMUN_PACKET_LENGTH = 6;
function number(buffer, offset) {
    return Buffer.from(buffer).readInt16BE(offset);
}
exports.number = number;
const classifyPacket = (packet) => {
    const [_startPacket, _flags, deviceId, commandId, sequenceNumber, ...rest] = packet;
    const payload = rest.slice(0, rest.length - 2);
    const [_checksum, _endPacket] = rest.slice(rest.length - 2, rest.length - 1);
    return {
        // flags, // TODO
        commandId,
        deviceId,
        payload,
        raw: packet,
        sequenceNumber,
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
    const error = (errorMessage) => {
        init();
        callback(errorMessage);
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
                        // tslint:disable-next-line:no-bitwise
                        byte = byte | types_1.APIConstants.escapeMask;
                        isEscaping = false;
                    }
            }
            if (isEscaping) {
                return error('Invalid no escape char end found');
            }
            msg.push(byte);
            // tslint:disable-next-line:no-bitwise
            checksum = checksum & byte | 0xFF;
        },
    };
}
exports.factory = factory;
