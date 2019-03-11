import { combineFlags } from '../utils';
import {
  APIConstants,
  Flags,
  ICommand,
  ICommandOutput,
  ICommandWithRaw
} from './types';

function encodeBytes(
  out: ICommandOutput,
  byte: number,
  appendChecksum: boolean = false
) {
  const unsignedInt = new Uint8Array([byte])[0];
  switch (unsignedInt) {
    case APIConstants.startOfPacket:
      out.bytes.push(APIConstants.escape, APIConstants.escapedStartOfPacket);
      break;

    case APIConstants.endOfPacket:
      out.bytes.push(APIConstants.escape, APIConstants.escapedEndOfPacket);
      break;

    case APIConstants.escape:
      out.bytes.push(APIConstants.escape, APIConstants.escapedEscape);
      break;

    default:
      out.bytes.push(byte);
  }

  // tslint:disable-next-line:no-bitwise
  out.checksum = (out.checksum + byte) & 0xff;
}

export function encode(command: ICommand): ICommandWithRaw {
  const {
    commandFlags = [Flags.requestsResponse, Flags.resetsInactivityTimeout],
    deviceId,
    commandId,
    sequenceNumber,
    payload = []
  } = command;
  const out: ICommandOutput = {
    bytes: [],
    checksum: 0x00
  };

  out.bytes.push(APIConstants.startOfPacket);
  encodeBytes(
    out,
    combineFlags([
      ...commandFlags,
      command.targetId ? Flags.commandHasTargetId : 0
    ]),
    true
  );

  if (command.targetId) {
    encodeBytes(out, command.targetId, true);
  }

  encodeBytes(out, deviceId, true);
  encodeBytes(out, commandId, true);
  encodeBytes(out, sequenceNumber, true);

  if (payload) {
    payload.forEach(byte => {
      encodeBytes(out, byte, true);
    });
  }
  // tslint:disable-next-line:no-bitwise
  out.checksum = ~out.checksum;
  encodeBytes(out, out.checksum);
  out.bytes.push(APIConstants.endOfPacket);
  return {
    ...command,
    raw: new Uint8Array(out.bytes)
  };
}
