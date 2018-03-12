import { CommandGenerator, DriveFlag, ICommandWithRaw } from './types';
declare const _default: (generator: CommandGenerator) => {
    drive: (speed: number, heading: number, flags: DriveFlag[]) => ICommandWithRaw;
};
export default _default;
