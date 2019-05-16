import { Core } from './core';

// web
// export enum ServicesUUID {
//   apiV2ControlService = '00010001-574f-4f20-5370-6865726f2121',
//   nordicDfuService = '00020001-574f-4f20-5370-6865726f2121'
// }

export enum ServicesUUID {
  apiV2ControlService = '00010001574f4f2053706865726f2121',
  nordicDfuService = '00020001574f4f2053706865726f2121'
}

export enum CharacteristicUUID {
  apiV2Characteristic = '00010002574f4f2053706865726f2121',
  dfuControlCharacteristic = '00020002574f4f2053706865726f2121',
  dfuInfoCharacteristic = '00020004574f4f2053706865726f2121',
  antiDoSCharacteristic = '00020005574f4f2053706865726f2121',
  subsCharacteristic = '00020003574f4f2053706865726f2121'
}

export interface IToyAdvertisement {
  name: string;
  prefix: string;
  class: typeof Core;
}

export enum Stance {
  tripod = 0x01,
  bipod = 0x02
}

export enum APIVersion {
  V2,
  V21
}

export enum SensorMaskValues {
  off = 0,
  locator = 1,
  gyro = 2,
  orientation = 3,
  accelerometer = 4
}

export enum SensorControlDefaults {
  intervalToHz = 1000,
  interval = 250
}

export interface ISensorMaskRaw {
  v2: SensorMaskV2[];
  v21: SensorMaskV2[];
}

// tslint:disable:no-bitwise
export enum SensorMaskV2 {
  off = 0,
  velocityY = 1 << 3,
  velocityX = 1 << 4,
  locatorY = 1 << 5,
  locatorX = 1 << 6,

  gyroZFilteredV2 = 1 << 10,
  gyroYFilteredV2 = 1 << 11,
  gyroXFilteredV2 = 1 << 12,

  // Need this for V2.1
  gyroZFilteredV21 = 1 << 23,
  gyroYFilteredV21 = 1 << 24,
  gyroXFilteredV21 = 1 << 25,

  accelerometerZFiltered = 1 << 13,
  accelerometerYFiltered = 1 << 14,
  accelerometerXFiltered = 1 << 15,
  imuYawAngleFiltered = 1 << 16,
  imuRollAngleFiltered = 1 << 17,
  imuPitchAngleFiltered = 1 << 18,

  gyroFilteredAllV2 = SensorMaskV2.gyroZFilteredV2 |
    SensorMaskV2.gyroYFilteredV2 |
    SensorMaskV2.gyroXFilteredV2,
  gyroFilteredAllV21 = SensorMaskV2.gyroZFilteredV21 |
    SensorMaskV2.gyroYFilteredV21 |
    SensorMaskV2.gyroXFilteredV21, // Need this for V21
  imuAnglesFilteredAll = SensorMaskV2.imuYawAngleFiltered |
    SensorMaskV2.imuRollAngleFiltered |
    SensorMaskV2.imuPitchAngleFiltered,
  accelerometerFilteredAll = SensorMaskV2.accelerometerZFiltered |
    SensorMaskV2.accelerometerYFiltered |
    SensorMaskV2.accelerometerXFiltered,
  locatorAll = SensorMaskV2.locatorX |
    SensorMaskV2.locatorY |
    SensorMaskV2.velocityX |
    SensorMaskV2.velocityY
}
// tslint:enable:no-bitwise
