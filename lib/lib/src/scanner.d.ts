import { IToyDiscovered } from './scanner';
import { Peripheral } from 'noble';
import { IToyAdvertisement } from './toys/types';
import { Core } from './toys/core';
import { BB9E } from './toys/bb9e';
import { R2D2 } from './toys/r2d2';
import { R2Q5 } from './toys/r2q5';
import { LightningMcQueen } from './toys/lightning-mcqueen';
import { SpheroMini } from './toys/sphero-mini';
export interface IToyDiscovered extends IToyAdvertisement {
    peripheral: Peripheral;
}
/**
 * Searches (but does not start) toys that matcht the passed criteria
 */
export declare const findToys: (toysType: IToyAdvertisement[]) => Promise<IToyDiscovered[]>;
/**
 * Searches toys that match the passed criteria, starts the first found toy and returns it
 */
export declare const find: (toyType: IToyAdvertisement, name?: string) => Promise<void | Core>;
/**
 * Searches toys that match the passed criteria, starts and returns them
 */
export declare const findAll: (toyType: IToyAdvertisement) => Promise<any[]>;
/**
 * Searches BB9E toys, starts the first one that was found and returns it
 */
export declare const findBB9E: () => Promise<BB9E>;
/**
 * Searches R2D2 toys, starts the first one that was found and returns it
 */
export declare const findR2D2: () => Promise<R2D2>;
/**
 * Searches R2Q5 toys, starts the first one that was found and returns it
 */
export declare const findR2Q5: () => Promise<R2Q5>;
/**
 * Searches Sphero Mini toys, starts the first one that was found and returns it
 */
export declare const findSpheroMini: () => Promise<SpheroMini>;
/**
 * Searches a Sphero Mini toy with the passed name, starts and returns it
 */
export declare const findSpheroMiniByName: (name: string) => Promise<SpheroMini>;
/**
 * Searches for all available Sphero Mini toys, starts and returns them
 */
export declare const findAllSpheroMini: () => Promise<SpheroMini[]>;
/**
 * Searches Lightning McQueen toys, starts the first one that was found and returns it
 */
export declare const findLightningMcQueen: () => Promise<LightningMcQueen>;
