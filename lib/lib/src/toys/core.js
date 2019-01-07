"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
const decoder_1 = require("../commands/decoder");
const types_1 = require("../commands/types");
const utils_1 = require("../utils");
const queue_1 = require("./queue");
const types_2 = require("./types");
// TS workaround until 2.8 (not released), then ReturnType<factory>
exports.commandsType = false && commands_1.factory();
exports.decodeType = false && decoder_1.factory(_ => null);
var Event;
(function (Event) {
    Event["onCollision"] = "onCollision";
    Event["onSensor"] = "onSensor";
})(Event = exports.Event || (exports.Event = {}));
class Core {
    constructor(p) {
        this.peripheral = p;
    }
    async batteryVoltage() {
        const response = await this.queueCommand(this.commands.power.batteryVoltage());
        return decoder_1.number(response.command.payload, 1) / 100;
    }
    wake() {
        return this.queueCommand(this.commands.power.wake());
    }
    sleep() {
        return this.queueCommand(this.commands.power.sleep());
    }
    async start() {
        // start
        await this.init();
        await this.write(this.antiDoSCharacteristic, 'usetheforce...band');
        await utils_1.toPromise(this.dfuControlCharacteristic.subscribe.bind(this.dfuControlCharacteristic));
        await utils_1.toPromise(this.apiV2Characteristic.subscribe.bind(this.apiV2Characteristic));
        await this.initPromise;
        this.initPromiseResolve = null;
        this.started = true;
        try {
            await this.wake();
        }
        catch (e) {
            // tslint:disable-next-line:no-console
            console.error('error', e);
        }
    }
    async appVersion() {
        const response = await this.queueCommand(this.commands.systemInfo.appVersion());
        return {
            major: decoder_1.number(response.command.payload, 1),
            minor: decoder_1.number(response.command.payload, 3)
        };
    }
    on(eventName, handler) {
        this.eventsListeners[eventName] = handler;
    }
    destroy() {
        // TODO handle all unbind, disconnect, etc
        this.eventsListeners = {}; // remove references
    }
    queueCommand(command) {
        return this.queue.queue({
            characteristic: this.apiV2Characteristic,
            command
        });
    }
    async init() {
        const p = this.peripheral;
        this.initPromise = new Promise(async (resolve) => {
            this.initPromiseResolve = resolve;
        });
        this.queue = new queue_1.Queue({
            match: (cA, cB) => this.match(cA, cB),
            onExecute: item => this.onExecute(item)
        });
        this.eventsListeners = {};
        this.commands = commands_1.factory();
        this.decoder = decoder_1.factory((error, packet) => this.onPacketRead(error, packet));
        this.started = false;
        await utils_1.toPromise(p.connect.bind(p));
        await utils_1.toPromise(p.discoverAllServicesAndCharacteristics.bind(p));
        this.bindServices();
        this.bindListeners();
    }
    async onExecute(item) {
        if (!this.started) {
            return;
        }
        await this.write(item.characteristic, item.command.raw);
    }
    match(commandA, commandB) {
        return (commandA.command.deviceId === commandB.command.deviceId &&
            commandA.command.commandId === commandB.command.commandId &&
            commandA.command.sequenceNumber === commandB.command.sequenceNumber);
    }
    bindServices() {
        this.peripheral.services.forEach(s => s.characteristics.forEach(c => {
            if (c.uuid === types_2.CharacteristicUUID.antiDoSCharacteristic) {
                this.antiDoSCharacteristic = c;
            }
            else if (c.uuid === types_2.CharacteristicUUID.apiV2Characteristic) {
                this.apiV2Characteristic = c;
            }
            else if (c.uuid === types_2.CharacteristicUUID.dfuControlCharacteristic) {
                this.dfuControlCharacteristic = c;
            }
            // else if (c.uuid === CharacteristicUUID.dfuInfoCharacteristic) {
            //   this.dfuInfoCharacteristic = c;
            // }
        }));
    }
    bindListeners() {
        this.apiV2Characteristic.on('read', (data, isNotification) => this.onApiRead(data, isNotification));
        this.apiV2Characteristic.on('notify', (data, isNotification) => this.onApiNotify(data, isNotification));
        this.dfuControlCharacteristic.on('notify', (data, isNotification) => this.onDFUControlNotify(data, isNotification));
    }
    onPacketRead(error, command) {
        if (error) {
            // tslint:disable-next-line:no-console
            console.error('There was a parse error', error);
        }
        else if (command.sequenceNumber === 255) {
            this.eventHandler(command);
        }
        else {
            this.queue.onCommandProcessed({ command });
        }
    }
    eventHandler(command) {
        if (command.deviceId === types_1.DeviceId.sensor &&
            command.commandId === types_1.SensorCommandIds.collisionDetectedAsync) {
            this.handleCollision(command);
        }
        else if (command.deviceId === types_1.DeviceId.sensor &&
            command.commandId === types_1.SensorCommandIds.sensorResponse) {
            this.handleSensorUpdate(command);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log('UNKOWN EVENT', command.raw);
        }
    }
    handleCollision(command) {
        // TODO parse collision
        const handler = this.eventsListeners.onCollision;
        if (handler) {
            handler(command);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log('No handler for collision but collision was detected');
        }
    }
    handleSensorUpdate(command) {
        // TODO parse sensor
        const handler = this.eventsListeners.onSensor;
        if (handler) {
            handler(command);
        }
        else {
            // tslint:disable-next-line:no-console
            console.log('No handler for collision but collision was detected');
        }
    }
    onApiRead(data, isNotification) {
        data.forEach(byte => this.decoder.add(byte));
    }
    onApiNotify(data, isNotification) {
        if (this.initPromiseResolve) {
            this.initPromiseResolve();
            this.initPromiseResolve = null;
            this.initPromise = null;
            return;
        }
    }
    onDFUControlNotify(data, isNotification) {
        return this.write(this.dfuControlCharacteristic, new Uint8Array([0x30]));
    }
    write(c, data) {
        let buff;
        if (typeof data === 'string') {
            buff = Buffer.from(data);
        }
        else {
            buff = new Buffer(data);
        }
        return utils_1.toPromise(c.write.bind(c, buff, true));
    }
}
exports.Core = Core;
