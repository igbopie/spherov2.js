import { CommandGenerator, DeviceId, ICommandWithRaw, PowerCommandIds } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.powerInfo);
  return {
    sleep: () => encode({
      commandId: PowerCommandIds.sleep,
    }),
    wake: () => encode({
      commandId: PowerCommandIds.wake,
    }),
  };
};
