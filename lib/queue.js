"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QUEUE_MODE;
(function (QUEUE_MODE) {
    QUEUE_MODE[QUEUE_MODE["NO_QUEUE"] = 0] = "NO_QUEUE";
    QUEUE_MODE[QUEUE_MODE["QUEUE"] = 1] = "QUEUE";
    QUEUE_MODE[QUEUE_MODE["QUEUE_TRYAGAIN"] = 2] = "QUEUE_TRYAGAIN";
    QUEUE_MODE[QUEUE_MODE["QUEUE_IGNORE_ERROR"] = 3] = "QUEUE_IGNORE_ERROR";
})(QUEUE_MODE || (QUEUE_MODE = {}));
class Queue {
    constructor(queueListener) {
        this.commandQueue = [];
        this.executing = null;
        this.qeueMode = QUEUE_MODE.QUEUE;
        this.queueListener = queueListener;
    }
    onCommandProcessed(payloadReceived) {
        if (this.executing) {
            const payloadSent = this.executing.payload;
            if (this.queueListener.match(payloadSent, payloadReceived)) {
                this.executing.success(payloadReceived);
                clearTimeout(this.executing.timeout);
                this.executing = null;
            }
            else {
                this.handleQueueError('Payload does not match');
            }
        }
        else {
            // tslint:disable-next-line:no-console
            console.log('PACKET RECEIVED BUT NOT EXECUTING', payloadReceived);
        }
        this.processCommand();
    }
    queue(payload) {
        if (this.qeueMode === QUEUE_MODE.NO_QUEUE) {
            // TODO
        }
        else {
            return new Promise((success, reject) => {
                this.commandQueue.push({
                    payload,
                    reject,
                    success,
                });
                this.processCommand();
            });
        }
    }
    processCommand() {
        if (!this.executing) {
            this.executing = this.commandQueue.shift();
            if (this.executing) {
                this.executing.timeout = setTimeout(() => this.onCommandTimedout(), 5000);
                this.queueListener.onExecute(this.executing.payload);
            }
        }
    }
    onCommandTimedout() {
        this.handleQueueError('Command Timedout');
    }
    handleQueueError(error) {
        if (this.qeueMode === QUEUE_MODE.QUEUE) {
            this.executing.reject(error);
            clearTimeout(this.executing.timeout);
            this.executing = null;
            this.processCommand();
        }
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map