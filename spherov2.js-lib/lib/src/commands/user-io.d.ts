import { CommandGenerator, ICommandWithRaw } from './types';
import { Stance } from '../toys/types';
declare const _default: (generator: CommandGenerator) => {
    allLEDsRaw: (payload: number[]) => ICommandWithRaw;
    setBackLedIntensity: (i: number) => ICommandWithRaw;
    setMainLedBlueIntensity: (b: number) => ICommandWithRaw;
    setMainLedColor: (r: number, g: number, b: number) => ICommandWithRaw;
    setMainLedGreenIntensity: (g: number) => ICommandWithRaw;
    setMainLedRedIntensity: (r: number) => ICommandWithRaw;
    playAudioFile: (idx: number) => ICommandWithRaw;
    turnDome: (angle: Uint8Array) => ICommandWithRaw;
    setStance: (stance: Stance) => ICommandWithRaw;
    playAnimation: (animation: number) => ICommandWithRaw;
};
export default _default;
