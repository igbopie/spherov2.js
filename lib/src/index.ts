import * as scanner from './scanner';
import * as utils from './utils';
import { toys } from './toys';

export const Toys = toys;
/**
 * Use Scanner to find toys
 */
export const Scanner = scanner;
/**
 * Utility functions
 */
export const Utils = utils;

export { BB9E } from './toys/bb9e';
export { LightningMcQueen } from './toys/lightning-mcqueen';
export { R2D2 } from './toys/r2d2';
export { R2Q5 } from './toys/r2q5';
export { SpheroMini } from './toys/sphero-mini';
export { SpheroBolt } from './toys/sphero-bolt';

export { RollableToy } from './toys/rollable-toy';
export { Core } from './toys/core';
export { Event } from './toys/core';
export { Stance } from './toys/types';
export { ICommandWithRaw } from './commands/types';
