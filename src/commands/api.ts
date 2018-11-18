import {
  APIProcessCommandIds,
  CommandGenerator,
  DeviceId,
  ICommandWithRaw
} from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.apiProcessor);
  return {
    echo: (): ICommandWithRaw =>
      encode({
        commandId: APIProcessCommandIds.echo
      })
  };
};
