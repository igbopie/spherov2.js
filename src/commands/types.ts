export enum DeviceId {
  apiProcessor = 0x10,
  systemInfo = 0x11,
  powerInfo = 0x13,
  driving = 0x16,
  animatronics = 0x17,
  sensor = 0x18,
  userIO = 0x1A
}

export enum APIProcessCommandIds {
  echo = 0x00
}

export enum SystemInfoCommandIds {
  mainApplicationVersion = 0x00,
  bootloaderVersion = 0x01
}

export enum PowerCommandIds {
  deepSleep = 0x00,
  sleep = 0x01,
  batteryVoltage = 0x03,
  wake = 0x0D
}

export enum DrivingCommandIds {
  rawMotor = 0x01,
  resetYaw = 0x06,
  driveWithHeading = 0x07,
  stabilization = 0x0C
}

export enum AnimatronicsCommandIds {
  animationBundle = 0x05,
  shoulderAction = 0x0D,
  domePosition = 0x0F,
  shoulderActionComplete = 0x26,
  enableShoulderActionCompleteAsync = 0x2A
}

export enum SensorCommandIds {
  sensorMask = 0x00,
  sensorResponse = 0x02,
  configureCollision = 0x11,
  collisionDetectedAsync = 0x12,
  resetLocator = 0x13,
  enableCollisionAsync = 0x14,
}

export enum UserIOCommandIds {
  allLEDs = 0x0E,
  playAudioFile = 0x07,
  audioVolume = 0x08,
  stopAudio = 0xA,
  testSound = 0x18
}

export enum Flags {
  isResponse = 1,
  requestsResponse = 2,
  requestsOnlyErrorResponse = 2 << 1,
  resetsInactivityTimeout = 2 << 2
}

export enum APIConstants {
  escape = 0xAB,
  startOfPacket = 0x8D,
  endOfPacket = 0xD8,
  escapeMask = 0x88,
  escapedEscape = APIConstants.escape & ~APIConstants.escapeMask,
  escapedStartOfPacket = APIConstants.startOfPacket & ~APIConstants.escapeMask,
  escapedEndOfPacket = APIConstants.endOfPacket & ~APIConstants.escapeMask
}

export enum DriveFlag {
  reverse = 0x01,
  boost = 0x02,
  fastTurnMode = 2 << 1,
  tankDriveLeftMotorReverse = 2 << 2,
  tankDriveRightMotorReverse = 2 << 3
}


export type CommandId = UserIOCommandIds | AnimatronicsCommandIds | DrivingCommandIds | PowerCommandIds | SystemInfoCommandIds | APIProcessCommandIds;
export interface CommandOutput {
  bytes: Array<number>;
  checksum: number;
}

export interface CommandPartial {
  payload?: Array<number>;
  commandId: CommandId;
}

export interface Command  extends CommandPartial {
  deviceId: DeviceId;
  commandFlags?: Array<Flags>;
  sequenceNumber: number;
}

export interface CommandWithRaw extends Command {
  raw: Uint8Array
}

export type CommandGenerator = (deviceId: number) => (part: CommandPartial) => CommandWithRaw;
