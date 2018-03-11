"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QUEUE_MODE;
(function (QUEUE_MODE) {
    QUEUE_MODE[QUEUE_MODE["NO_QUEUE"] = 0] = "NO_QUEUE";
    QUEUE_MODE[QUEUE_MODE["QUEUE"] = 1] = "QUEUE";
    QUEUE_MODE[QUEUE_MODE["QUEUE_TRYAGAIN"] = 2] = "QUEUE_TRYAGAIN";
    QUEUE_MODE[QUEUE_MODE["QUEUE_IGNORE_ERROR"] = 3] = "QUEUE_IGNORE_ERROR"; // NOT IMPLEMENTED
})(QUEUE_MODE || (QUEUE_MODE = {}));
class Queue {
    constructor(queueListener) {
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
    onCommandProcessed(payloadReceived) {
        if (this.executing) {
            const payloadSent = this.executing.payload;
            if (this.queueListener.match(payloadSent, payloadReceived)) {
                console.log('RESPONSE COMMAND', payloadReceived);
                this.executing.success();
                clearTimeout(this.executing.timeout);
                this.executing = null;
            }
            else {
                console.log('RESPONSE COMMAND ERROR', payloadReceived);
                this.handleQueueError();
            }
        }
        else {
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
    queue(payload) {
        if (this.qeueMode === QUEUE_MODE.NO_QUEUE) {
            // TODO
        }
        else {
            let success;
            let reject;
            let promise = new Promise((_success, _reject) => {
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
exports.Queue = Queue;
