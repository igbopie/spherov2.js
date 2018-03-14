// tslint:disable-next-line:no-unused-variable
import { CommandGenerator, DeviceId, ICommandWithRaw, SystemInfoCommandIds } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.systemInfo);
  return {
    appVersion: () => encode({
      commandId: SystemInfoCommandIds.mainApplicationVersion,
    }),

    something: () => encode({
      commandId: SystemInfoCommandIds.something, // Maybe voltages??
    }),

    something6: () => encode({
      commandId: SystemInfoCommandIds.something6, // Maybe voltages??
    }),

    something7: () => encode({
      commandId: SystemInfoCommandIds.something7, // Maybe voltages??
    }),
  };
};
