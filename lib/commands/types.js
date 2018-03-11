"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceId;
(function (DeviceId) {
    DeviceId[DeviceId["apiProcessor"] = 16] = "apiProcessor";
    DeviceId[DeviceId["systemInfo"] = 17] = "systemInfo";
    DeviceId[DeviceId["powerInfo"] = 19] = "powerInfo";
    DeviceId[DeviceId["driving"] = 22] = "driving";
    DeviceId[DeviceId["animatronics"] = 23] = "animatronics";
    DeviceId[DeviceId["sensor"] = 24] = "sensor";
    DeviceId[DeviceId["userIO"] = 26] = "userIO";
})(DeviceId = exports.DeviceId || (exports.DeviceId = {}));
var APIProcessCommandIds;
(function (APIProcessCommandIds) {
    APIProcessCommandIds[APIProcessCommandIds["echo"] = 0] = "echo";
})(APIProcessCommandIds = exports.APIProcessCommandIds || (exports.APIProcessCommandIds = {}));
var SystemInfoCommandIds;
(function (SystemInfoCommandIds) {
    SystemInfoCommandIds[SystemInfoCommandIds["mainApplicationVersion"] = 0] = "mainApplicationVersion";
    SystemInfoCommandIds[SystemInfoCommandIds["bootloaderVersion"] = 1] = "bootloaderVersion";
})(SystemInfoCommandIds = exports.SystemInfoCommandIds || (exports.SystemInfoCommandIds = {}));
var PowerCommandIds;
(function (PowerCommandIds) {
    PowerCommandIds[PowerCommandIds["deepSleep"] = 0] = "deepSleep";
    PowerCommandIds[PowerCommandIds["sleep"] = 1] = "sleep";
    PowerCommandIds[PowerCommandIds["batteryVoltage"] = 3] = "batteryVoltage";
    PowerCommandIds[PowerCommandIds["wake"] = 13] = "wake";
})(PowerCommandIds = exports.PowerCommandIds || (exports.PowerCommandIds = {}));
var DrivingCommandIds;
(function (DrivingCommandIds) {
    DrivingCommandIds[DrivingCommandIds["rawMotor"] = 1] = "rawMotor";
    DrivingCommandIds[DrivingCommandIds["resetYaw"] = 6] = "resetYaw";
    DrivingCommandIds[DrivingCommandIds["driveWithHeading"] = 7] = "driveWithHeading";
    DrivingCommandIds[DrivingCommandIds["stabilization"] = 12] = "stabilization";
})(DrivingCommandIds = exports.DrivingCommandIds || (exports.DrivingCommandIds = {}));
var AnimatronicsCommandIds;
(function (AnimatronicsCommandIds) {
    AnimatronicsCommandIds[AnimatronicsCommandIds["animationBundle"] = 5] = "animationBundle";
    AnimatronicsCommandIds[AnimatronicsCommandIds["shoulderAction"] = 13] = "shoulderAction";
    AnimatronicsCommandIds[AnimatronicsCommandIds["domePosition"] = 15] = "domePosition";
    AnimatronicsCommandIds[AnimatronicsCommandIds["shoulderActionComplete"] = 38] = "shoulderActionComplete";
    AnimatronicsCommandIds[AnimatronicsCommandIds["enableShoulderActionCompleteAsync"] = 42] = "enableShoulderActionCompleteAsync";
})(AnimatronicsCommandIds = exports.AnimatronicsCommandIds || (exports.AnimatronicsCommandIds = {}));
var SensorCommandIds;
(function (SensorCommandIds) {
    SensorCommandIds[SensorCommandIds["sensorMask"] = 0] = "sensorMask";
    SensorCommandIds[SensorCommandIds["sensorResponse"] = 2] = "sensorResponse";
    SensorCommandIds[SensorCommandIds["configureCollision"] = 17] = "configureCollision";
    SensorCommandIds[SensorCommandIds["collisionDetectedAsync"] = 18] = "collisionDetectedAsync";
    SensorCommandIds[SensorCommandIds["resetLocator"] = 19] = "resetLocator";
    SensorCommandIds[SensorCommandIds["enableCollisionAsync"] = 20] = "enableCollisionAsync";
})(SensorCommandIds = exports.SensorCommandIds || (exports.SensorCommandIds = {}));
var UserIOCommandIds;
(function (UserIOCommandIds) {
    UserIOCommandIds[UserIOCommandIds["allLEDs"] = 14] = "allLEDs";
    UserIOCommandIds[UserIOCommandIds["playAudioFile"] = 7] = "playAudioFile";
    UserIOCommandIds[UserIOCommandIds["audioVolume"] = 8] = "audioVolume";
    UserIOCommandIds[UserIOCommandIds["stopAudio"] = 10] = "stopAudio";
    UserIOCommandIds[UserIOCommandIds["testSound"] = 24] = "testSound";
})(UserIOCommandIds = exports.UserIOCommandIds || (exports.UserIOCommandIds = {}));
var Flags;
(function (Flags) {
    Flags[Flags["isResponse"] = 1] = "isResponse";
    Flags[Flags["requestsResponse"] = 2] = "requestsResponse";
    Flags[Flags["requestsOnlyErrorResponse"] = 4] = "requestsOnlyErrorResponse";
    Flags[Flags["resetsInactivityTimeout"] = 8] = "resetsInactivityTimeout";
})(Flags = exports.Flags || (exports.Flags = {}));
var APIConstants;
(function (APIConstants) {
    APIConstants[APIConstants["escape"] = 171] = "escape";
    APIConstants[APIConstants["startOfPacket"] = 141] = "startOfPacket";
    APIConstants[APIConstants["endOfPacket"] = 216] = "endOfPacket";
    APIConstants[APIConstants["escapeMask"] = 136] = "escapeMask";
    APIConstants[APIConstants["escapedEscape"] = 35] = "escapedEscape";
    APIConstants[APIConstants["escapedStartOfPacket"] = 5] = "escapedStartOfPacket";
    APIConstants[APIConstants["escapedEndOfPacket"] = 80] = "escapedEndOfPacket";
})(APIConstants = exports.APIConstants || (exports.APIConstants = {}));
var DriveFlag;
(function (DriveFlag) {
    DriveFlag[DriveFlag["reverse"] = 1] = "reverse";
    DriveFlag[DriveFlag["boost"] = 2] = "boost";
    DriveFlag[DriveFlag["fastTurnMode"] = 4] = "fastTurnMode";
    DriveFlag[DriveFlag["tankDriveLeftMotorReverse"] = 8] = "tankDriveLeftMotorReverse";
    DriveFlag[DriveFlag["tankDriveRightMotorReverse"] = 16] = "tankDriveRightMotorReverse";
})(DriveFlag = exports.DriveFlag || (exports.DriveFlag = {}));
