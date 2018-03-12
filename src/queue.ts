enum QUEUE_MODE {
  NO_QUEUE, // NOT IMPLEMENTED
  QUEUE,
  QUEUE_TRYAGAIN, // NOT IMPLEMENTED
  QUEUE_IGNORE_ERROR, // NOT IMPLEMENTED
}

export interface ICommandQueueItem<P> {
  // promise: Promise<any>,
  payload: P;
  timeout?: NodeJS.Timer;
  success: (payload: P) => any;
  reject: (error: string) => any;
}

export interface IQueueListener<P> {
  onExecute: (command: P) => Promise<any>;
  match: (commandA: P, commandB: P) => boolean;
}

export class Queue<P> {

  private commandQueue: Array<ICommandQueueItem<P>>;
  private qeueMode: QUEUE_MODE;
  private executing: ICommandQueueItem<P> | null;
  private queueListener: IQueueListener<P>;

  constructor(queueListener: IQueueListener<P>) {
    this.commandQueue = [];
    this.executing = null;
    this.qeueMode = QUEUE_MODE.QUEUE;
    this.queueListener = queueListener;
  }

  public onCommandProcessed(payloadReceived: P) {
    if (this.executing) {
      const payloadSent = this.executing.payload;
      if (this.queueListener.match(payloadSent, payloadReceived)) {
        this.executing.success(payloadReceived);
        clearTimeout(this.executing.timeout);
        this.executing = null;
      } else {
        this.handleQueueError('Payload does not match');
      }
    } else {
      // tslint:disable-next-line:no-console
      console.log('PACKET RECEIVED BUT NOT EXECUTING', payloadReceived);
    }

    this.processCommand();
  }

  public queue(payload: P): Promise<P> {
    if (this.qeueMode === QUEUE_MODE.NO_QUEUE) {
      // TODO
    } else {
      return new Promise<P>((success, reject) => {
        this.commandQueue.push({
          payload,
          reject,
          success,
        });
        this.processCommand();
      });
    }
  }

  private processCommand() {
    if (!this.executing) {
      this.executing = this.commandQueue.shift();
      if (this.executing) {
        this.executing.timeout = setTimeout(() => this.onCommandTimedout(), 5000);
        this.queueListener.onExecute(this.executing.payload);
      }
    }
  }

  private onCommandTimedout() {
    this.handleQueueError('Command Timedout');
  }

  private handleQueueError(error: string) {
    if (this.qeueMode === QUEUE_MODE.QUEUE) {
      this.executing.reject(error);
      clearTimeout(this.executing.timeout);
      this.executing = null;
      this.processCommand();
    }
  }
}
