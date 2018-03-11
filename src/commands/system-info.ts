import { CommandGenerator, DeviceId, SystemInfoCommandIds } from "./types";

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.systemInfo);
  return {
    appVersion: () => encode({
      commandId: SystemInfoCommandIds.mainApplicationVersion
    }),
  }
};
