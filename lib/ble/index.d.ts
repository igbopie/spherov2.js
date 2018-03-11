/// <reference types="node" />
export interface Peripheral {
    connect(cb: (error?: string) => void): void;
    discoverAllServicesAndCharacteristics(cb: (error?: string) => void): void;
    services: Array<Services>;
}
export interface Services {
    uuid: string;
    characteristics: Array<Characteristic>;
}
export interface Characteristic {
    uuid: string;
    subscribe(cb: (error?: string) => void): void;
    write(buf: Buffer, notify: boolean, cb: (error?: string) => void): void;
    on(eventName: string, fn: (data: Buffer, isNotification: boolean) => void): void;
}
