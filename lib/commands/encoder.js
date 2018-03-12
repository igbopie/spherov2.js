"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const types_1 = require("./types");
function encodeBytes(out, byte, appendChecksum = false) {
    const unsignedInt = new Uint8Array([byte])[0];
    switch (unsignedInt) {
        case types_1.APIConstants.startOfPacket:
            out.bytes.push(types_1.APIConstants.escape, types_1.APIConstants.escapedStartOfPacket);
            break;
        case types_1.APIConstants.endOfPacket:
            out.bytes.push(types_1.APIConstants.escape, types_1.APIConstants.escapedEndOfPacket);
            break;
        case types_1.APIConstants.escape:
            out.bytes.push(types_1.APIConstants.escape, types_1.APIConstants.escapedEscape);
            break;
        default:
            out.bytes.push(byte);
    }
    // tslint:disable-next-line:no-bitwise
    out.checksum = (out.checksum + byte) & 0xff;
}
function encode(command) {
    const { commandFlags = [types_1.Flags.requestsResponse, types_1.Flags.resetsInactivityTimeout], deviceId, commandId, sequenceNumber, payload = [], } = command;
    const out = {
        bytes: [],
        checksum: 0x00,
    };
    out.bytes.push(types_1.APIConstants.startOfPacket);
    encodeBytes(out, utils_1.combineFlags(commandFlags), true);
    encodeBytes(out, deviceId, true);
    encodeBytes(out, commandId, true);
    encodeBytes(out, sequenceNumber, true);
    if (payload) {
        payload.forEach((byte) => {
            encodeBytes(out, byte, true);
        });
    }
    // tslint:disable-next-line:no-bitwise
    out.checksum = ~out.checksum;
    encodeBytes(out, out.checksum);
    out.bytes.push(types_1.APIConstants.endOfPacket);
    return Object.assign({}, command, { raw: new Uint8Array(out.bytes) });
}
exports.encode = encode;
