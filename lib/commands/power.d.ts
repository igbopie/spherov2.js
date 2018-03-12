import { CommandGenerator, ICommandWithRaw } from './types';
declare const _default: (generator: CommandGenerator) => {
    batteryVoltage: () => ICommandWithRaw;
    sleep: () => ICommandWithRaw;
    wake: () => ICommandWithRaw;
};
export default _default;
