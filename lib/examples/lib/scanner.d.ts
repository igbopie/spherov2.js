import { Peripheral } from 'noble';
import { SpheroMini } from '../../toys/sphero-mini';
import { IToyAdvertisement } from '../../toys/types';
import { LightingMcQueen } from '../../toys/lighting-mcqueen';
import { Core } from '../../toys/core';
export interface IToyDiscovered extends IToyAdvertisement {
    peripheral: Peripheral;
}
export declare const findToys: (toysType: IToyAdvertisement[]) => Promise<IToyDiscovered[]>;
export declare const find: (toyType: IToyAdvertisement) => Promise<Core>;
export declare const findSpheroMini: () => Promise<SpheroMini>;
export declare const findLightintMcQueen: () => Promise<LightingMcQueen>;
