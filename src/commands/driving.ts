import { combineFlags } from '../utils';
import { CommandGenerator, DeviceId, DriveFlag, DrivingCommandIds, ICommandWithRaw } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.driving);
  return {
    drive: (speed: number, heading: number, flags: DriveFlag[]) => encode({
      commandId: DrivingCommandIds.driveWithHeading,
      payload: [
        speed,
        // tslint:disable-next-line:no-bitwise
        heading >> 8 & 0xff,
        // tslint:disable-next-line:no-bitwise
        heading & 0xff,
        combineFlags(flags),
      ],
    }),
  };
};
