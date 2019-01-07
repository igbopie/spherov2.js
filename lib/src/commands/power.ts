import {
  CommandGenerator,
  DeviceId,
  PowerCommandIds,
  ICommandWithRaw
} from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.powerInfo);
  return {
    batteryVoltage: (): ICommandWithRaw =>
      encode({
        commandId: PowerCommandIds.batteryVoltage
      }),
    sleep: (): ICommandWithRaw =>
      encode({
        commandId: PowerCommandIds.sleep
      }),
    something2: (): ICommandWithRaw =>
      encode({
        commandId: PowerCommandIds.something2
      }),
    something3: (): ICommandWithRaw =>
      encode({
        commandId: PowerCommandIds.something3
      }),
    something4: (): ICommandWithRaw =>
      encode({
        commandId: PowerCommandIds.something4
      }),
    wake: (): ICommandWithRaw =>
      encode({
        commandId: PowerCommandIds.wake
      })
  };
};
