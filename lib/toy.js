"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const commands_1 = require("./commands");
const decoder_1 = require("./commands/decoder");
const queue_1 = require("./queue");
const types_1 = require("./types");
// TS workaround until 2.8 (not released), then ReturnType<factory>
const commandsType = false && commands_1.factory();
const decodeType = false && decoder_1.factory((_) => null);
class Toy {
    constructor(p) {
        this.peripheral = p;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const p = this.peripheral;
            this.queue = new queue_1.Queue(this);
            this.commands = commands_1.factory();
            this.decoder = decoder_1.factory((error, packet) => this.onPacketRead(error, packet));
            this.started = false;
            yield utils_1.toPromise(p.connect.bind(p));
            yield utils_1.toPromise(p.discoverAllServicesAndCharacteristics.bind(p));
            this.bindServices();
            yield this.bindListeners();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // start
            yield this.init();
            yield this.write(this.antiDoSCharacteristic, "usetheforce...band");
            yield utils_1.toPromise(this.dfuControlCharacteristic.subscribe.bind(this.dfuControlCharacteristic));
            yield utils_1.toPromise(this.apiV2Characteristic.subscribe.bind(this.apiV2Characteristic));
            this.started = true;
            yield this.wake();
        });
    }
    bindServices() {
        this.peripheral.services.forEach(s => s.characteristics.forEach(c => {
            console.log(c.uuid);
            if (c.uuid === types_1.CharacteristicUUID.antiDoSCharacteristic) {
                this.antiDoSCharacteristic = c;
            }
            else if (c.uuid === types_1.CharacteristicUUID.apiV2Characteristic) {
                this.apiV2Characteristic = c;
            }
            else if (c.uuid === types_1.CharacteristicUUID.dfuControlCharacteristic) {
                this.dfuControlCharacteristic = c;
            }
            else if (c.uuid === types_1.CharacteristicUUID.dfuInfoCharacteristic) {
                this.dfuInfoCharacteristic = c;
            }
        }));
    }
    bindListeners() {
        return __awaiter(this, void 0, void 0, function* () {
            this.apiV2Characteristic.on('read', (data, isNotification) => this.onApiRead(data, isNotification));
            this.apiV2Characteristic.on('notify', (data, isNotification) => this.onApiNotify(data, isNotification));
            this.dfuControlCharacteristic.on('notify', (data, isNotification) => this.onDFUControlNotify(data, isNotification));
        });
    }
    onExecute(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.started)
                return;
            yield this.write(item.characteristic, item.command.raw);
        });
    }
    match(commandA, commandB) {
        return commandA.command.deviceId === commandB.command.deviceId &&
            commandA.command.commandId === commandB.command.commandId &&
            commandA.command.sequenceNumber === commandB.command.sequenceNumber;
    }
    onPacketRead(error, command) {
        if (error) {
            console.error('There was a parse error', error);
        }
        else {
            this.queue.onCommandProcessed({
                command
            });
        }
    }
    onApiRead(data, isNotification) {
        // console.log('READAPI', data, isNotification)
        data.forEach(byte => this.decoder.add(byte));
    }
    onApiNotify(data, isNotification) {
        return this.wake();
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
        ;
    }
    wake() {
        return this.queue.queue({
            characteristic: this.apiV2Characteristic,
            command: this.commands.power.wake()
        });
    }
    sleep() {
        return this.queue.queue({
            characteristic: this.apiV2Characteristic,
            command: this.commands.power.sleep()
        });
    }
    roll(speed, heading, flags) {
        return this.queue.queue({
            characteristic: this.apiV2Characteristic,
            command: this.commands.driving.drive(speed, heading, flags)
        });
    }
    rollTime(speed, heading, time, flags) {
        return __awaiter(this, void 0, void 0, function* () {
            let drive = true;
            console.log('DRIVE');
            setTimeout(() => drive = false, time);
            while (drive) {
                yield this.queue.queue({
                    characteristic: this.apiV2Characteristic,
                    command: this.commands.driving.drive(speed, heading, flags)
                });
            }
            console.log('STOP');
            yield this.queue.queue({
                characteristic: this.apiV2Characteristic,
                command: this.commands.driving.drive(0, heading, flags)
            });
        });
    }
}
exports.Toy = Toy;
