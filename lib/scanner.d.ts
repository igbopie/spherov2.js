import { Peripheral } from 'noble';
export interface IToyAdvertisement {
    name: string;
    prefix: string;
}
export interface IToyDiscovered extends IToyAdvertisement {
    peripheral: Peripheral;
}
export declare const findToys: () => Promise<IToyDiscovered[]>;
