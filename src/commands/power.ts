import { CommandGenerator, DeviceId, PowerCommandIds } from "./types";

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.powerInfo);
  return {
    wake: () => encode({
      commandId: PowerCommandIds.wake,
    }),
    sleep: () => encode({
      commandId: PowerCommandIds.sleep,
    })
  }
};
