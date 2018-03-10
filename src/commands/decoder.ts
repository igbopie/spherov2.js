import { APIConstants, DeviceId, CommandId, CommandWithRaw } from "./types";


const MINIMUN_PACKET_LENGTH = 6;

const classifyPacket = (packet: Uint8Array): CommandWithRaw => {
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
}

export function factory(callback: (err: string, response?: CommandWithRaw) => void) {
  let msg: Array<number> = [];
  let checksum: number = 0;
  let isEscaping: boolean = false;

  const init = () => {
    msg = [];
    checksum = 0;
    isEscaping = false;
  };
  const error = (msg: string) => {
    init();
    callback(msg);
  }
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
            return error('Invalid last byte ' + msg.length)
          }

          if (checksum !== 0xFF) {
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
              byte = byte | APIConstants.escapeMask
              isEscaping = false
          }
      }

      if (isEscaping) {
        return error('Invalid no escape char end found');
      }

      msg.push(byte);
      checksum =  checksum & byte | 0xFF
    }
  }
}