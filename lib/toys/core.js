"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
const decoder_1 = require("../commands/decoder");
const utils_1 = require("../utils");
const queue_1 = require("./queue");
const types_1 = require("./types");
// TS workaround until 2.8 (not released), then ReturnType<factory>
exports.commandsType = false && commands_1.factory();
exports.decodeType = false && decoder_1.factory((_) => null);
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
    queueCommand(command) {
        return this.queue.queue({
            characteristic: this.apiV2Characteristic,
            command,
        });
    }
    async init() {
        const p = this.peripheral;
        this.initPromise = new Promise(async (resolve) => {
            this.initPromiseResolve = resolve;
        });
        this.queue = new queue_1.Queue({
            match: (cA, cB) => this.match(cA, cB),
            onExecute: (item) => this.onExecute(item),
        });
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
        return commandA.command.deviceId === commandB.command.deviceId &&
            commandA.command.commandId === commandB.command.commandId &&
            commandA.command.sequenceNumber === commandB.command.sequenceNumber;
    }
    bindServices() {
        this.peripheral.services.forEach((s) => s.characteristics.forEach((c) => {
            if (c.uuid === types_1.CharacteristicUUID.antiDoSCharacteristic) {
                this.antiDoSCharacteristic = c;
            }
            else if (c.uuid === types_1.CharacteristicUUID.apiV2Characteristic) {
                this.apiV2Characteristic = c;
            }
            else if (c.uuid === types_1.CharacteristicUUID.dfuControlCharacteristic) {
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
        else {
            this.queue.onCommandProcessed({ command });
        }
    }
    onApiRead(data, isNotification) {
        data.forEach((byte) => this.decoder.add(byte));
    }
    onApiNotify(data, isNotification) {
        // nothing
        if (this.initPromiseResolve) {
            this.initPromiseResolve();
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
//# sourceMappingURL=core.js.map