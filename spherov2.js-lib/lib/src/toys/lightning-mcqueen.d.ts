import { Core, IQueuePayload } from './core';
import { IToyAdvertisement } from './types';
export declare class LightningMcQueen extends Core {
    static advertisement: IToyAdvertisement;
    driveAsRc(heading: number, speed: number): Promise<IQueuePayload>;
}
