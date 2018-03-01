import { CommandGenerator, DeviceId, DrivingCommandIds, DriveFlag } from "./types";
import { combineFlags } from "../utils";

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.driving);
  return {
    drive: (speed: number, heading: number, flags: Array<DriveFlag>) => encode({
      payload: [
        speed,
        heading >> 8 & 0xff,
        heading & 0xff,
        combineFlags(flags)
      ],
      commandId: DrivingCommandIds.driveWithHeading,
    })
  }
};
