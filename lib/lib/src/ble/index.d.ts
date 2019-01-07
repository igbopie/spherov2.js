/// <reference types="node" />
export interface IPeripheral {
    services: IServices[];
    connect(cb: (error?: string) => void): void;
    discoverAllServicesAndCharacteristics(cb: (error?: string) => void): void;
}
export interface IServices {
    uuid: string;
    characteristics: ICharacteristic[];
}
export interface ICharacteristic {
    uuid: string;
    subscribe(cb: (error?: string) => void): void;
    write(buf: Buffer, notify: boolean, cb: (error?: string) => void): void;
    on(eventName: string, fn: (data: Buffer, isNotification: boolean) => void): void;
}
