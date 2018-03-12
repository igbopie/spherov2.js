// tslint:disable-next-line:no-unused-variable
import { APIProcessCommandIds, CommandGenerator, DeviceId, ICommandWithRaw } from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.apiProcessor);
  return {
    echo: () => encode({
      commandId: APIProcessCommandIds.echo,
    }),
  };
};
