import {
  CommandGenerator,
  DeviceId,
  SystemInfoCommandIds,
  ICommandWithRaw
} from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.systemInfo);
  return {
    appVersion: (): ICommandWithRaw =>
      encode({
        commandId: SystemInfoCommandIds.mainApplicationVersion
      }),

    something: (): ICommandWithRaw =>
      encode({
        commandId: SystemInfoCommandIds.something // Maybe voltages??
      }),

    something6: (): ICommandWithRaw =>
      encode({
        commandId: SystemInfoCommandIds.something6 // Maybe voltages??
      }),

    something7: (): ICommandWithRaw =>
      encode({
        commandId: SystemInfoCommandIds.something7 // Maybe voltages??
      })
  };
};
