import { CommandGenerator, ICommandWithRaw } from './types';
declare const _default: (generator: CommandGenerator) => {
    allLEDsRaw: (payload: number[]) => ICommandWithRaw;
    setBackLedIntensity: (i: number) => ICommandWithRaw;
    setMainLedBlueIntensity: (b: number) => ICommandWithRaw;
    setMainLedColor: (r: number, g: number, b: number) => ICommandWithRaw;
    setMainLedGreenIntensity: (g: number) => ICommandWithRaw;
    setMainLedRedIntensity: (r: number) => ICommandWithRaw;
};
export default _default;
