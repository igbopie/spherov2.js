import { IToyAdvertisement, Stance } from './types';
import { RollableToy } from './rollable-toy';
import { IQueuePayload } from './core';
export declare class R2D2 extends RollableToy {
    static advertisement: IToyAdvertisement;
    wake(): Promise<IQueuePayload>;
    sleep(): Promise<IQueuePayload>;
    playAudioFile(idx: number): Promise<IQueuePayload>;
    turnDome(angle: number): Promise<IQueuePayload>;
    setStance(stance: Stance): Promise<IQueuePayload>;
    playAnimation(animation: number): Promise<IQueuePayload>;
    private calculateDomeAngle;
    private static hobIndex;
}
