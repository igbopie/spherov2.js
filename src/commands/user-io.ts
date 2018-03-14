// tslint:disable-next-line:no-unused-variable
import { CommandGenerator, DeviceId, ICommandWithRaw, SystemInfoCommandIds, UserIOCommandIds } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.userIO);
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
  };
};
