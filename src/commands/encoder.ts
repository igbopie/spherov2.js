import { APIConstants, CommandOutput, Flags, Command } from "./types";
import { combineFlags } from "../utils";

function encodeBytes(out: CommandOutput, byte: number, appendChecksum: boolean = false) {
  switch (byte) {
    case APIConstants.startOfPacket:
      out.bytes.push(...[APIConstants.escape, APIConstants.escapedStartOfPacket]);
      break;

    case APIConstants.endOfPacket:
      out.bytes.push(...[APIConstants.escape, APIConstants.escapedEndOfPacket]);
      break;

    case APIConstants.escape:
      out.bytes.push(...[APIConstants.escape, APIConstants.escapedEscape]);
      break;

    default:
      out.bytes.push(...[byte]);
  }

  out.checksum = ( out.checksum + byte ) & 0xff;
}


export function encode ({
  commandFlags = [Flags.requestsResponse, Flags.resetsInactivityTimeout],
  deviceId,
  commandId,
  sequenceNumber,
  payload = []
}: Command) {
  let out: CommandOutput = {
    bytes: [],
    checksum: 0x00
  };

  out.bytes.push(APIConstants.startOfPacket);
  encodeBytes(out, combineFlags(commandFlags), true);
  encodeBytes(out, deviceId, true);
  encodeBytes(out, commandId, true);
  encodeBytes(out, sequenceNumber, true);

  if (payload) {
    payload.forEach(byte => {
      encodeBytes(out, byte, true);
    });
  }

  out.checksum = ~out.checksum
  encodeBytes(out, out.checksum);
  out.bytes.push(APIConstants.endOfPacket);
  return new Uint8Array(out.bytes);
}