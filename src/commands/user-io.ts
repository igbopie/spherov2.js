import {
  AnimatronicsCommandIds,
  CommandGenerator,
  DeviceId,
  UserIOCommandIds,
  ICommandWithRaw
} from './types';
import { Stance } from '../toys/types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.userIO);
  const encodeAnimatronics = generator(DeviceId.animatronics);
  return {
    allLEDsRaw: (payload: number[]): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload
      }),
    setBackLedIntensity: (i: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x01, i]
      }),
    setMainLedBlueIntensity: (b: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x08, b]
      }),
    setMainLedColor: (r: number, g: number, b: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x70, r, g, b]
      }),
    setMainLedGreenIntensity: (g: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x04, g]
      }),
    setMainLedRedIntensity: (r: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x02, r]
      }),
    playAudioFile: (idx: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.playAudioFile,
        payload: [idx, 0x00, 0x00]
      }),
    turnDome: (angle: Uint8Array): ICommandWithRaw =>
      encodeAnimatronics({
        commandId: AnimatronicsCommandIds.domePosition,
        payload: [angle[1], angle[0], 0x00, 0x00]
      }),
    setStance: (stance: Stance): ICommandWithRaw =>
      encodeAnimatronics({
        commandId: AnimatronicsCommandIds.shoulderAction,
        payload: [stance]
      }),
    playAnimation: (animation: number): ICommandWithRaw =>
      encodeAnimatronics({
        commandId: AnimatronicsCommandIds.animationBundle,
        payload: [0x00, animation]
      })
  };
};
