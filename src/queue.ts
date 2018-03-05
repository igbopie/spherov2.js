enum QUEUE_MODE {
  NO_QUEUE, // NOT IMPLEMENTED
  QUEUE,
  QUEUE_TRYAGAIN, // NOT IMPLEMENTED
  QUEUE_IGNORE_ERROR // NOT IMPLEMENTED
}

interface CommandQueueItem<P> {
  promise: PromiseLike<any>,
  payload: P,
  timeout?: NodeJS.Timer,
  success: () => any,
  reject: () => any
}

interface QueueListener<P> {
  onExecute: (command: P) => Promise<any>,
  match: (commandA: P, commandB: P) => boolean
}

export class Queue<P> {

  commandQueue: Array<CommandQueueItem<P>>;
  qeueMode: QUEUE_MODE;
  executing: CommandQueueItem<P> | null;
  queueListener: QueueListener<P>;

  constructor(queueListener: QueueListener<P>) {
    this.commandQueue = [];
    this.executing = null;
    this.qeueMode = QUEUE_MODE.QUEUE;
    this.queueListener = queueListener;
  }

  handleQueueError() {
    if (this.qeueMode === QUEUE_MODE.QUEUE) {
      this.executing.reject();
      clearTimeout(this.executing.timeout);
      this.executing = null;
      this.processCommand();
    }
  }

  onCommandProcessed(payloadReceived: P) {
    if (this.executing){
      const payloadSent = this.executing.payload;
      if (this.queueListener.match(payloadSent, payloadReceived)) {
        console.log('RESPONSE COMMAND', payloadReceived);
        this.executing.success();
        clearTimeout(this.executing.timeout);
        this.executing = null;
      } else {
        console.log('RESPONSE COMMAND ERROR', payloadReceived);
        this.handleQueueError();
      }
    } else {
      console.log('PACKET RECEIVED BUT NOT EXECUTING', payloadReceived);
    }

    this.processCommand();
  }

  processCommand() {
    if (!this.executing) {
      this.executing = this.commandQueue.shift();
      if (this.executing) {
        console.log('WRITING COMMAND', this.executing.payload);
        this.executing.timeout = setTimeout(() => this.onCommandTimedout(), 5000);
        this.queueListener.onExecute(this.executing.payload);
      }
    }
  }

  onCommandTimedout() {
    console.log('RESPONSE COMMAND TIMEDOUT');
    this.handleQueueError();
  }

  queue(payload: P) {
    if (this.qeueMode === QUEUE_MODE.NO_QUEUE) {
      // TODO
    } else {
      let success;
      let reject;
      let promise = new Promise((_success, _reject)=> {
        success = _success;
        reject = _reject;
      });

      // todo add timeout;
      this.commandQueue.push({
        payload,
        promise,
        success,
        reject
      });
      this.processCommand();
      return promise;
    }
  }
}