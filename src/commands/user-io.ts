// tslint:disable-next-line
import {AnimatronicsCommandIds, CommandGenerator, DeviceId, UserIOCommandIds} from './types';
import {Stance} from '../toys/r2d2';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.userIO);
  const encodeAnimatronics = generator(DeviceId.animatronics);
  return {
    allLEDsRaw: (payload: number[]) => encode({
      commandId: UserIOCommandIds.allLEDs,
      payload,
    }),
    setBackLedIntensity: (i: number) => encode({
      commandId: UserIOCommandIds.allLEDs,
      payload: [ 0x00, 0x01, i ],
    }),
    setMainLedBlueIntensity: (b: number) => encode({
      commandId: UserIOCommandIds.allLEDs,
      payload: [ 0x00, 0x08, b ],
    }),
    setMainLedColor: (r: number, g: number, b: number) => encode({
      commandId: UserIOCommandIds.allLEDs,
      payload: [ 0x00, 0x70, r, g, b ],
    }),
    setMainLedGreenIntensity: (g: number) => encode({
      commandId: UserIOCommandIds.allLEDs,
      payload: [ 0x00, 0x04, g ],
    }),
    setMainLedRedIntensity: (r: number) => encode({
      commandId: UserIOCommandIds.allLEDs,
      payload: [ 0x00, 0x02, r ],
    }),
    playAudioFile: (idx: number) => encode({
        commandId: UserIOCommandIds.playAudioFile,
        payload: [idx, 0x00, 0x00], // 0x01, 0x02, 0x03, 0x04, 0x06, 0x07, 0x08, 0x0b, 0x0c, 0x0e, 0x0f
    }),
    turnDome: (angle: Uint8Array) => encodeAnimatronics({
        commandId: AnimatronicsCommandIds.domePosition,
        payload: [angle[1], angle[0], 0x00, 0x00],
    }),
    setStance: (stance: Stance) => encodeAnimatronics({
        commandId: AnimatronicsCommandIds.shoulderAction,
        payload: [stance],
    }),
    playAnimation: (animation: number) => encodeAnimatronics( {
        commandId: AnimatronicsCommandIds.animationBundle,
        payload: [0x00, animation],
    }),
  };
};
