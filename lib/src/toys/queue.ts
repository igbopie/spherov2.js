export interface ICommandQueueItem<P> {
  payload: P;
  timeout?: NodeJS.Timer;
  success: (payload: P) => unknown;
  reject: (error: string) => unknown;
}

export interface IQueueListener<P> {
  onExecute: (command: P) => Promise<unknown>;
  match: (commandA: P, commandB: P) => boolean;
}

export class Queue<P> {
  private waitingForResponseQueue: ICommandQueueItem<P>[];
  private commandQueue: ICommandQueueItem<P>[];
  private queueListener: IQueueListener<P>;

  constructor(queueListener: IQueueListener<P>) {
    this.commandQueue = [];
    this.waitingForResponseQueue = [];
    this.queueListener = queueListener;
  }

  public onCommandProcessed(payloadReceived: P): void {
    const lastCommand: ICommandQueueItem<P> = this.waitingForResponseQueue.find(
      (command) => this.queueListener.match(command.payload, payloadReceived)
    );
    if (lastCommand) {
      this.removeFromWaiting(lastCommand);
      lastCommand.success(payloadReceived);
    } else {
      console.log('PACKET RECEIVED BUT NOT EXECUTING', payloadReceived);
    }
  }

  public queue(payload: P): Promise<P> {
    return new Promise<P>((success, reject) => {
      this.commandQueue.push({
        payload,
        reject,
        success,
      });
      this.processCommand();
    });
  }

  // Becareful not to exceed 255 as seq will return to 0 and it can collide.
  private processCommand() {
    const command = this.commandQueue.shift();
    if (command) {
      this.queueListener.onExecute(command.payload);
      this.waitingForResponseQueue.push(command);
      command.timeout = setTimeout(() => this.onCommandTimedout(command), 5000);
    }
  }

  private removeFromWaiting(command: ICommandQueueItem<P>) {
    const index = this.waitingForResponseQueue.indexOf(command);
    if (index >= 0) {
      this.waitingForResponseQueue.splice(index, 1);
      clearTimeout(command.timeout);
    }
  }

  private onCommandTimedout(command: ICommandQueueItem<P>) {
    this.handleQueueError('Command Timedout', command);
    this.removeFromWaiting(command);
  }

  private handleQueueError(error: string, command: ICommandQueueItem<P>) {
    command.reject(error);
  }
}
