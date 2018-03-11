export declare enum DeviceId {
    apiProcessor = 16,
    systemInfo = 17,
    powerInfo = 19,
    driving = 22,
    animatronics = 23,
    sensor = 24,
    userIO = 26,
}
export declare enum APIProcessCommandIds {
    echo = 0,
}
export declare enum SystemInfoCommandIds {
    mainApplicationVersion = 0,
    bootloaderVersion = 1,
}
export declare enum PowerCommandIds {
    deepSleep = 0,
    sleep = 1,
    batteryVoltage = 3,
    wake = 13,
}
export declare enum DrivingCommandIds {
    rawMotor = 1,
    resetYaw = 6,
    driveWithHeading = 7,
    stabilization = 12,
}
export declare enum AnimatronicsCommandIds {
    animationBundle = 5,
    shoulderAction = 13,
    domePosition = 15,
    shoulderActionComplete = 38,
    enableShoulderActionCompleteAsync = 42,
}
export declare enum SensorCommandIds {
    sensorMask = 0,
    sensorResponse = 2,
    configureCollision = 17,
    collisionDetectedAsync = 18,
    resetLocator = 19,
    enableCollisionAsync = 20,
}
export declare enum UserIOCommandIds {
    allLEDs = 14,
    playAudioFile = 7,
    audioVolume = 8,
    stopAudio = 10,
    testSound = 24,
}
export declare enum Flags {
    isResponse = 1,
    requestsResponse = 2,
    requestsOnlyErrorResponse = 4,
    resetsInactivityTimeout = 8,
}
export declare enum APIConstants {
    escape = 171,
    startOfPacket = 141,
    endOfPacket = 216,
    escapeMask = 136,
    escapedEscape = 35,
    escapedStartOfPacket = 5,
    escapedEndOfPacket = 80,
}
export declare enum DriveFlag {
    reverse = 1,
    boost = 2,
    fastTurnMode = 4,
    tankDriveLeftMotorReverse = 8,
    tankDriveRightMotorReverse = 16,
}
export declare type CommandId = UserIOCommandIds | AnimatronicsCommandIds | DrivingCommandIds | PowerCommandIds | SystemInfoCommandIds | APIProcessCommandIds;
export interface CommandOutput {
    bytes: Array<number>;
    checksum: number;
}
export interface CommandPartial {
    payload?: Array<number>;
    commandId: CommandId;
}
export interface Command extends CommandPartial {
    deviceId: DeviceId;
    commandFlags?: Array<Flags>;
    sequenceNumber: number;
}
export interface CommandWithRaw extends Command {
    raw: Uint8Array;
}
export declare type CommandGenerator = (deviceId: number) => (part: CommandPartial) => CommandWithRaw;
