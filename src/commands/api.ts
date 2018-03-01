import { CommandGenerator, DeviceId, APIProcessCommandIds } from "./types";

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.apiProcessor);
  return {
    echo: () => encode({
      commandId: APIProcessCommandIds.echo,
    })
  }
};
