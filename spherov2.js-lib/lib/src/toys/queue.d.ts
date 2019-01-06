/// <reference types="node" />
export interface ICommandQueueItem<P> {
    payload: P;
    timeout?: NodeJS.Timer;
    success: (payload: P) => any;
    reject: (error: string) => any;
}
export interface IQueueListener<P> {
    onExecute: (command: P) => Promise<any>;
    match: (commandA: P, commandB: P) => boolean;
}
export declare class Queue<P> {
    private waitingForResponseQueue;
    private commandQueue;
    private queueListener;
    constructor(queueListener: IQueueListener<P>);
    onCommandProcessed(payloadReceived: P): void;
    queue(payload: P): Promise<P>;
    private processCommand;
    private removeFromWaiting;
    private onCommandTimedout;
    private handleQueueError;
}
