import { APIConstants, ICommandWithRaw, Flags } from './types';

const MINIMUN_PACKET_LENGTH = 6;

export function number(buffer: number[], offset: number) {
  return Buffer.from(buffer).readInt16BE(offset);
}

const decodeFlags = (flags: number) => {
  // tslint:disable:no-bitwise
  const isResponse: boolean = !!(flags & Flags.isResponse);
  const requestsResponse: boolean = !!(flags & Flags.requestsResponse);
  const requestsOnlyErrorResponse: boolean = !!(
    flags & Flags.requestsOnlyErrorResponse
  );
  const resetsInactivityTimeout: boolean = !!(
    flags & Flags.resetsInactivityTimeout
  );
  const commandHasTargetId: boolean = !!(flags & Flags.commandHasTargetId);
  const commandHasSourceId: boolean = !!(flags & Flags.commandHasSourceId);
  // tslint:enable:no-bitwise
  return {
    isResponse,
    requestsResponse,
    requestsOnlyErrorResponse,
    resetsInactivityTimeout,
    commandHasTargetId,
    commandHasSourceId
  };
};

const classifyPacket = (packet: Uint8Array): ICommandWithRaw => {
  const [_startPacket, flags, ...rest] = packet;
  const { commandHasTargetId, commandHasSourceId } = decodeFlags(flags);

  let sourceId;
  let targetId;

  if (commandHasTargetId) {
    targetId = rest.shift();
  }

  if (commandHasSourceId) {
    sourceId = rest.shift();
  }

  const deviceId = rest.shift();
  const commandId = rest.shift();
  const sequenceNumber = rest.shift();
  const payload = rest.slice(0, rest.length - 2);
  const [_checksum, _endPacket] = rest.slice(rest.length - 2, rest.length - 1);

  return {
    // flags, // TODO
    sourceId,
    targetId,
    commandId,
    deviceId,
    payload,
    raw: packet,
    sequenceNumber
  };
};

export function factory(
  callback: (err: string, response?: ICommandWithRaw) => void
) {
  let msg: number[] = [];
  let checksum: number = 0;
  let isEscaping: boolean = false;

  const init = () => {
    msg = [];
    checksum = 0;
    isEscaping = false;
  };
  const error = (errorMessage: string) => {
    init();
    callback(errorMessage);
  };
  return {
    add(byte: number) {
      switch (byte) {
        case APIConstants.startOfPacket:
          if (msg.length !== 0) {
            init();
            return callback('Invalid first byte');
          }
          return msg.push(byte);
        case APIConstants.endOfPacket:
          if (msg.length === 0 || msg.length < MINIMUN_PACKET_LENGTH) {
            return error('Invalid last byte ' + msg.length);
          }

          if (checksum !== 0xff) {
            return error('Invalid checksum');
          }

          msg.push(byte);
          callback(undefined, classifyPacket(new Uint8Array(msg)));
          return init();

        case APIConstants.escape:
          if (isEscaping) {
            return error('Invalid escape char position');
          }
          isEscaping = true;
          return;
        case APIConstants.escapedStartOfPacket:
        case APIConstants.escapedEndOfPacket:
        case APIConstants.escapedEscape:
          if (isEscaping) {
            // tslint:disable-next-line:no-bitwise
            byte = byte | APIConstants.escapeMask;
            isEscaping = false;
          }
      }

      if (isEscaping) {
        return error('Invalid no escape char end found');
      }

      msg.push(byte);
      // tslint:disable-next-line:no-bitwise
      checksum = (checksum & byte) | 0xff;
    }
  };
}
