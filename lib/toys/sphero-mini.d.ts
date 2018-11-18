import { IToyAdvertisement } from './types';
import { RollableToy } from './rollable-toy';
import { IQueuePayload } from './core';
export declare class SpheroMini extends RollableToy {
    static advertisement: IToyAdvertisement;
    enableCollisionDetection(): Promise<IQueuePayload>;
    configureCollisionDetection(xThreshold?: number, yThreshold?: number, xSpeed?: number, ySpeed?: number, deadTime?: number, method?: number): Promise<IQueuePayload>;
    configureSensorStream(): Promise<IQueuePayload>;
    something1(): Promise<IQueuePayload>;
    something2(): Promise<IQueuePayload>;
    something3(): Promise<IQueuePayload>;
    something4(): Promise<IQueuePayload>;
    something5(): Promise<IQueuePayload>;
    something6(): Promise<IQueuePayload>;
    something7(): Promise<IQueuePayload>;
}
