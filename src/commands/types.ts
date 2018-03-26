export enum DeviceId {
  apiProcessor = 0x10,
  systemInfo = 0x11,
  powerInfo = 0x13,
  driving = 0x16,
  animatronics = 0x17,
  sensor = 0x18,
  userIO = 0x1A,
  somethingAPI = 0x1F,
}

export enum SomethingApi {
  something5 = 0x27,
}

export enum APIProcessCommandIds {
  echo = 0x00,
}

export enum SystemInfoCommandIds {
  mainApplicationVersion = 0x00,
  bootloaderVersion = 0x01,
  something = 0x06,
  something6 = 0x12,
  something7 = 0x28,
}

export enum PowerCommandIds {
  deepSleep = 0x00,
  sleep = 0x01,
  batteryVoltage = 0x03,
  wake = 0x0D,
  something2 = 0x10, // every x time
  something3 = 0x04, // every x time
  something4 = 0x1e,
}

export enum DrivingCommandIds {
  rawMotor = 0x01,
  resetYaw = 0x06,
  driveAsSphero = 0x04,
  driveAsRc = 0x02,
  driveWithHeading = 0x07,
  stabilization = 0x0C,
}

export enum AnimatronicsCommandIds {
  animationBundle = 0x05,
  shoulderAction = 0x0D,
  domePosition = 0x0F,
  shoulderActionComplete = 0x26,
  enableShoulderActionCompleteAsync = 0x2A,
}

export enum SensorCommandIds {
  sensorMask = 0x00,
  sensorResponse = 0x02,
  configureCollision = 0x11,
  collisionDetectedAsync = 0x12,
  resetLocator = 0x13,
  enableCollisionAsync = 0x14,
  sensor1 = 0x0f,
  sensor2 = 0x17,
  configureSensorStream = 0x0c,
}

export enum UserIOCommandIds {
  allLEDs = 0x0E,
  playAudioFile = 0x07,
  audioVolume = 0x08,
  stopAudio = 0xA,
  testSound = 0x18,
}

export enum Flags {
  isResponse = 1,
  requestsResponse = 2,
  requestsOnlyErrorResponse = 4,
  resetsInactivityTimeout = 8,
}

export enum APIConstants {
  escape = 0xAB,
  startOfPacket = 0x8D,
  endOfPacket = 0xD8,
  escapeMask = 0x88,
  // tslint:disable-next-line:no-bitwise
  escapedEscape = APIConstants.escape & ~APIConstants.escapeMask,
  // tslint:disable-next-line:no-bitwise
  escapedStartOfPacket = APIConstants.startOfPacket & ~APIConstants.escapeMask,
  // tslint:disable-next-line:no-bitwise
  escapedEndOfPacket = APIConstants.endOfPacket & ~APIConstants.escapeMask,
}

export enum DriveFlag {
  reverse = 0x01,
  boost = 0x02,
  // tslint:disable-next-line:no-bitwise
  fastTurnMode = 2 << 1,
  // tslint:disable-next-line:no-bitwise
  tankDriveLeftMotorReverse = 2 << 2,
  // tslint:disable-next-line:no-bitwise
  tankDriveRightMotorReverse = 2 << 3,
}

export type CommandId =
  UserIOCommandIds |
  AnimatronicsCommandIds |
  DrivingCommandIds |
  PowerCommandIds |
  SystemInfoCommandIds |
  APIProcessCommandIds |
  SensorCommandIds |
  SomethingApi;

export interface ICommandOutput {
  bytes: number[];
  checksum: number;
}

export interface ICommandPartial {
  payload?: number[];
  commandId: CommandId;
}

export interface ICommand extends ICommandPartial {
  deviceId: DeviceId;
  commandFlags?: Flags[];
  sequenceNumber: number;
}

export interface ICommandWithRaw extends ICommand {
  raw: Uint8Array;
}

export type CommandGenerator = (deviceId: number) => (part: ICommandPartial) => ICommandWithRaw;
