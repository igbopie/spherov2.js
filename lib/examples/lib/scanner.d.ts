import { Peripheral } from 'noble';
import { SpheroMini } from '../../toys/sphero-mini';
import { IToyAdvertisement } from '../../toys/types';
export interface IToyDiscovered extends IToyAdvertisement {
    peripheral: Peripheral;
}
export declare const findToys: () => Promise<IToyDiscovered[]>;
export declare const findSpheroMini: () => Promise<SpheroMini>;
