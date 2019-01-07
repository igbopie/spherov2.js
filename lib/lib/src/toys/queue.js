"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor(queueListener) {
        this.commandQueue = [];
        this.waitingForResponseQueue = [];
        this.queueListener = queueListener;
    }
    onCommandProcessed(payloadReceived) {
        const lastCommand = this.waitingForResponseQueue.find(command => this.queueListener.match(command.payload, payloadReceived));
        if (lastCommand) {
            this.removeFromWaiting(lastCommand);
            lastCommand.success(payloadReceived);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log('PACKET RECEIVED BUT NOT EXECUTING', payloadReceived);
        }
    }
    queue(payload) {
        return new Promise((success, reject) => {
            this.commandQueue.push({
                payload,
                reject,
                success
            });
            this.processCommand();
        });
    }
    // Becareful not to exceed 255 as seq will return to 0 and it can collide.
    processCommand() {
        const command = this.commandQueue.shift();
        if (command) {
            this.queueListener.onExecute(command.payload);
            this.waitingForResponseQueue.push(command);
            command.timeout = setTimeout(() => this.onCommandTimedout(command), 5000);
        }
    }
    removeFromWaiting(command) {
        const index = this.waitingForResponseQueue.indexOf(command);
        if (index >= 0) {
            this.waitingForResponseQueue.splice(index, 1);
            clearTimeout(command.timeout);
        }
    }
    onCommandTimedout(command) {
        this.handleQueueError('Command Timedout', command);
        this.removeFromWaiting(command);
    }
    handleQueueError(error, command) {
        command.reject(error);
    }
}
exports.Queue = Queue;
