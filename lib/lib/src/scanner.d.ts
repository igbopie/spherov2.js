import { IToyDiscovered } from './scanner';
import { Peripheral } from 'noble';
import { IToyAdvertisement } from './toys/types';
import { Core } from './toys/core';
import { BB9E } from './toys/bb9e';
import { R2D2 } from './toys/r2d2';
import { LightningMcQueen } from './toys/lightning-mcqueen';
import { SpheroMini } from './toys/sphero-mini';
export interface IToyDiscovered extends IToyAdvertisement {
    peripheral: Peripheral;
}
export declare const findToys: (toysType: IToyAdvertisement[]) => Promise<IToyDiscovered[]>;
export declare const find: (toyType: IToyAdvertisement, name?: string) => Promise<Core>;
export declare const findAll: (toyType: IToyAdvertisement) => Promise<any[]>;
export declare const findBB9E: () => Promise<BB9E>;
export declare const findR2D2: () => Promise<R2D2>;
export declare const findSpheroMini: () => Promise<SpheroMini>;
export declare const findSpheroMiniByName: (name: string) => Promise<SpheroMini>;
export declare const findAllSpheroMini: () => Promise<SpheroMini[]>;
export declare const findLightningMcQueen: () => Promise<LightningMcQueen>;
