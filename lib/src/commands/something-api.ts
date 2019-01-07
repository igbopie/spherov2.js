import {
  CommandGenerator,
  DeviceId,
  SomethingApi,
  ICommandWithRaw
} from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.somethingAPI);
  return {
    something5: (): ICommandWithRaw =>
      encode({
        commandId: SomethingApi.something5
      })
  };
};
