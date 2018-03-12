import { Peripheral } from 'noble';
import { IToyAdvertisement } from './toys/types';
export interface IToyDiscovered extends IToyAdvertisement {
    peripheral: Peripheral;
}
export declare const findToys: () => Promise<IToyDiscovered[]>;
