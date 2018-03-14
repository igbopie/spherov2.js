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
    allLEDsRaw(payload: number[]): Promise<IQueuePayload>;
    setBackLedIntensity(i: number): Promise<IQueuePayload>;
    setMainLedBlueIntensity(i: number): Promise<IQueuePayload>;
    setMainLedColor(r: number, g: number, b: number): Promise<IQueuePayload>;
    setMainLedGreenIntensity(i: number): Promise<IQueuePayload>;
    setMainLedRedIntensity(i: number): Promise<IQueuePayload>;
    something1(): Promise<IQueuePayload>;
    something2(): Promise<IQueuePayload>;
    something3(): Promise<IQueuePayload>;
    something4(): Promise<IQueuePayload>;
    something5(): Promise<IQueuePayload>;
    something6(): Promise<IQueuePayload>;
    something7(): Promise<IQueuePayload>;
}
