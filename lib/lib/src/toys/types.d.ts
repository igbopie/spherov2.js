import { Core } from './core';
export declare enum ServicesUUID {
    apiV2ControlService = "00010001574f4f2053706865726f2121",
    nordicDfuService = "00020001574f4f2053706865726f2121",
}
export declare enum CharacteristicUUID {
    apiV2Characteristic = "00010002574f4f2053706865726f2121",
    dfuControlCharacteristic = "00020002574f4f2053706865726f2121",
    dfuInfoCharacteristic = "00020004574f4f2053706865726f2121",
    antiDoSCharacteristic = "00020005574f4f2053706865726f2121",
}
export interface IToyAdvertisement {
    name: string;
    prefix: string;
    class: typeof Core;
}
export declare enum Stance {
    tripod = 1,
    bipod = 2,
}
