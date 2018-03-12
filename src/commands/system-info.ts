// tslint:disable-next-line:no-unused-variable
import { CommandGenerator, DeviceId, ICommandWithRaw, SystemInfoCommandIds } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.systemInfo);
  return {
    appVersion: () => encode({
      commandId: SystemInfoCommandIds.mainApplicationVersion,
    }),
  };
};
