"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServicesUUID;
(function (ServicesUUID) {
    ServicesUUID["apiV2ControlService"] = "00010001574f4f2053706865726f2121";
    ServicesUUID["nordicDfuService"] = "00020001574f4f2053706865726f2121";
})(ServicesUUID = exports.ServicesUUID || (exports.ServicesUUID = {}));
var CharacteristicUUID;
(function (CharacteristicUUID) {
    CharacteristicUUID["apiV2Characteristic"] = "00010002574f4f2053706865726f2121";
    CharacteristicUUID["dfuControlCharacteristic"] = "00020002574f4f2053706865726f2121";
    CharacteristicUUID["dfuInfoCharacteristic"] = "00020004574f4f2053706865726f2121";
    CharacteristicUUID["antiDoSCharacteristic"] = "00020005574f4f2053706865726f2121";
})(CharacteristicUUID = exports.CharacteristicUUID || (exports.CharacteristicUUID = {}));
var Stance;
(function (Stance) {
    Stance[Stance["tripod"] = 1] = "tripod";
    Stance[Stance["bipod"] = 2] = "bipod";
})(Stance = exports.Stance || (exports.Stance = {}));
