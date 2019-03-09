import { combineFlags } from '../utils';
import {
  CommandGenerator,
  DeviceId,
  DriveFlag,
  DrivingCommandIds,
  ICommandWithRaw
} from './types';

const encodeNumberLM = (n: number) => {
  const absN = Math.abs(n * 3968);
  const nFirstHalfByte1 = n === 0 ? 0 : n > 0 ? 0x30 : 0xb0;

  // tslint:disable-next-line:no-bitwise
  const nSecondHalfByte1 = (absN >> 8) & 0x0f;

  return [
    // tslint:disable-next-line:no-bitwise
    nFirstHalfByte1 | nSecondHalfByte1,

    // tslint:disable-next-line:no-bitwise
    absN & 0xff,

    // tslint:disable-next-line:no-bitwise
    (0 >> 8) & 0xff,
    // tslint:disable-next-line:no-bitwise
    0 & 0xff
  ];
};

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.driving);
  return {
    drive: (
      speed: number,
      heading: number,
      flags: DriveFlag[]
    ): ICommandWithRaw =>
      encode({
        commandId: DrivingCommandIds.driveWithHeading,
        targetId: 0x12,
        payload: [
          speed,
          // tslint:disable-next-line:no-bitwise
          (heading >> 8) & 0xff,
          // tslint:disable-next-line:no-bitwise
          heading & 0xff,
          combineFlags(flags)
        ]
      }),
    driveAsRc: (heading: number, speed: number): ICommandWithRaw =>
      encode({
        // Value: 8d 08 16 02 8b bf 72 93 de 00 00 00 00 b2 d8
        commandId: DrivingCommandIds.driveAsRc,
        payload: [...encodeNumberLM(heading), ...encodeNumberLM(speed)]
      })
  };
};
