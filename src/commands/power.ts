// tslint:disable-next-line:no-unused-variable
import { CommandGenerator, DeviceId, ICommandWithRaw, PowerCommandIds } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.powerInfo);
  return {
    batteryVoltage: () => encode({
      commandId: PowerCommandIds.batteryVoltage,
    }),
    sleep: () => encode({
      commandId: PowerCommandIds.sleep,
    }),
    something2: () => encode({
      commandId: PowerCommandIds.something2,
    }),
    something3: () => encode({
      commandId: PowerCommandIds.something3,
    }),
    something4: () => encode({
      commandId: PowerCommandIds.something4,
    }),
    wake: () => encode({
      commandId: PowerCommandIds.wake,
    }),
  };
};
