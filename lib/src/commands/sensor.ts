import {
  CommandGenerator,
  DeviceId,
  SensorCommandIds,
  ICommandWithRaw
} from './types';

export default (generator: CommandGenerator) => {
  const encode = generator(DeviceId.sensor);
  return {
    enableCollisionAsync: (): ICommandWithRaw =>
      encode({
        commandId: SensorCommandIds.enableCollisionAsync
      }),

    /**
     * @param  {number} xThreshold An 8-bit settable threshold for the X (left/right)
     * and Y (front/back) axes of Sphero. A value of 00h disables the contribution of that axis.
     * @param  {number} yThreshold An 8-bit settable threshold for the X (left/right)
     * and Y (front/back) axes of Sphero. A value of 00h disables the contribution of that axis.
     * @param  {number} xSpeed An 8-bit settable speed value for the X and Y axes.
     * This setting is ranged by the speed, then added to Xt, Yt to generate the final threshold value.
     * @param  {number} ySpeed An 8-bit settable speed value for the X and Y axes.
     * This setting is ranged by the speed, then added to Xt, Yt to generate the final threshold value.
     * @param  {number} deadTime An 8-bit post-collision dead time to prevent retriggering; specified in 10ms increments.
     * @param  {number=0x01} method Detection method type to use. Currently the only method
     * supported is 01h. Use 00h to completely disable this service.
     */
    configureCollision: (
      xThreshold: number,
      yThreshold: number,
      xSpeed: number,
      ySpeed: number,
      deadTime: number,
      method: number = 0x01
    ) =>
      encode({
        commandId: SensorCommandIds.configureCollision,
        targetId: 0x12,
        payload: [method, xThreshold, xSpeed, yThreshold, ySpeed, deadTime]
      }),

    sensorMask: (
      sensorRawValue: number,
      streamingRate: number
    ): ICommandWithRaw => {
      const bytes = [
        (streamingRate >> 8) & 0xff, // tslint:disable-line:no-bitwise
        streamingRate & 0xff, // tslint:disable-line:no-bitwise
        0,
        (sensorRawValue >> 24) & 0xff, // tslint:disable-line:no-bitwise
        (sensorRawValue >> 16) & 0xff, // tslint:disable-line:no-bitwise
        (sensorRawValue >> 8) & 0xff, // tslint:disable-line:no-bitwise
        sensorRawValue & 0xff // tslint:disable-line:no-bitwise
      ];
      return encode({
        commandId: SensorCommandIds.sensorMask,
        targetId: 0x12,
        payload: bytes
      });
    },

    sensorMaskExtended: (mask: number): ICommandWithRaw => {
      const bytes = [
        (mask >> 24) & 0xff, // tslint:disable-line:no-bitwise
        (mask >> 16) & 0xff, // tslint:disable-line:no-bitwise
        (mask >> 8) & 0xff, // tslint:disable-line:no-bitwise
        mask & 0xff // tslint:disable-line:no-bitwise
      ];
      return encode({
        commandId: SensorCommandIds.sensorMaskExtended,
        targetId: 0x12,
        payload: bytes
      });
    }
  };
};
