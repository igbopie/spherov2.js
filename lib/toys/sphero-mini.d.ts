import { Core, IQueuePayload } from './core';
import { IToyAdvertisement } from './types';
export declare class SpheroMini extends Core {
    static advertisement: IToyAdvertisement;
    roll(speed: number, heading: number, flags: number[]): Promise<IQueuePayload>;
    rollTime(speed: number, heading: number, time: number, flags: number[]): Promise<void>;
    appVersion(): Promise<{
        major: number;
        minor: number;
    }>;
}
