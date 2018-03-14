// tslint:disable-next-line:no-unused-variable
import { CommandGenerator, DeviceId, ICommandWithRaw, SomethingApi } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.somethingAPI);
  return {
    something5: () => encode({
      commandId: SomethingApi.something5,
    }),
  };
};
