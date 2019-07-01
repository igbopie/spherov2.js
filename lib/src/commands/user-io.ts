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
      }),
    // Set R2D2 main LED color based on RGB vales (each can range between 0 and 255)
    // same like front LED color
    setR2D2LEDColor: (r: number, g: number, b: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x77, r, g, b, r, g, b]
      }),
    // Set R2D2 front LED color based on RGB vales (each can range between 0 and 255)
    // same like main LED color
    setR2D2FrontLEDColor: (r: number, g: number, b: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x07, r, g, b]
    }),
    // Set R2D2 back LED color based on RGB vales (each can range between 0 and 255)
    setR2D2BackLEDcolor: (r: number, g: number, b: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x70, r, g, b]
      }),
    // Set R2D2 the holo projector intensity based on 0-255 values
    setR2D2HoloProjectorIntensity: (i: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x80, i]
      }),
    // Set R2D2 the logic displays intensity based on 0-255 values
    setR2D2LogicDisplaysIntensity: (i: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.allLEDs,
        payload: [0x00, 0x08, i]
      }),
    // R2D2 Waddle
    // R2D2 waddles 3 = start waddle, 0 = stop waddle
    setR2D2Waddle: (waddle: number): ICommandWithRaw =>
      encodeAnimatronics({
        commandId: AnimatronicsCommandIds.shoulderAction,
        payload: [waddle]
      }),
    playR2D2Sound: (hex1: number, hex2: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.playAudioFile,
        payload: [hex1, hex2, 0x00]
      }),
    startIdleLedAnimation: (): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.startIdleLedAnimation
      }),
    setAudioVolume: (vol: number): ICommandWithRaw =>
      encode({
        commandId: UserIOCommandIds.audioVolume,
        payload: [vol]
      }),
  };
};
