import { ICharacteristic, IPeripheral } from './ble';
import { ICommandWithRaw } from './commands/types';
export interface IQueuePayload {
    command: ICommandWithRaw;
    characteristic?: ICharacteristic;
}
export declare class Toy {
    private peripheral;
    private apiV2Characteristic?;
    private dfuControlCharacteristic?;
    private antiDoSCharacteristic?;
    private commands;
    private decoder;
    private started;
    private queue;
    private initPromise;
    private initPromiseResolve;
    constructor(p: IPeripheral);
    wake(): Promise<IQueuePayload>;
    sleep(): Promise<IQueuePayload>;
    roll(speed: number, heading: number, flags: number[]): Promise<IQueuePayload>;
    rollTime(speed: number, heading: number, time: number, flags: number[]): Promise<void>;
    appVersion(): Promise<{
        major: number;
        minor: number;
    }>;
    start(): Promise<void>;
    private init();
    private onExecute(item);
    private match(commandA, commandB);
    private bindServices();
    private bindListeners();
    private onPacketRead(error, command);
    private onApiRead(data, isNotification);
    private onApiNotify(data, isNotification);
    private onDFUControlNotify(data, isNotification);
    private write(c, data);
}
