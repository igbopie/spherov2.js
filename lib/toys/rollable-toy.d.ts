import { Core, IQueuePayload } from './core';
export declare class RollableToy extends Core {
    roll(speed: number, heading: number, flags: number[]): Promise<IQueuePayload>;
    rollTime(speed: number, heading: number, time: number, flags: number[]): Promise<void>;
    allLEDsRaw(payload: number[]): Promise<IQueuePayload>;
    setBackLedIntensity(i: number): Promise<IQueuePayload>;
    setMainLedBlueIntensity(i: number): Promise<IQueuePayload>;
    setMainLedColor(r: number, g: number, b: number): Promise<IQueuePayload>;
    setMainLedGreenIntensity(i: number): Promise<IQueuePayload>;
    setMainLedRedIntensity(i: number): Promise<IQueuePayload>;
}
