
import { toPromise, wait } from './utils';
import { factory } from './commands';
import { factory as decodeFactory } from './commands/decoder';
import { CommandWithRaw } from './commands/types';
import { Queue } from './queue';
import { Characteristic, Peripheral } from './ble';
import { CharacteristicUUID } from './types';

// TS workaround until 2.8 (not released), then ReturnType<factory>
const commandsType = (false as true) && factory();
const decodeType = (false as true) && decodeFactory((_) => null);

interface QueuePayload {
  command: CommandWithRaw,
  characteristic?: Characteristic
}


export class Toy {
  peripheral: Peripheral;
  apiV2Characteristic?: Characteristic;
  dfuControlCharacteristic?: Characteristic;
  dfuInfoCharacteristic?: Characteristic;
  antiDoSCharacteristic?: Characteristic;
  commands: typeof commandsType;
  decoder: typeof decodeType;
  started: boolean;
  queue: Queue<QueuePayload>;

  constructor(p: Peripheral) {
    this.peripheral = p;
  }

  async init() {
    const p = this.peripheral

    this.queue = new Queue<QueuePayload>(this);
    this.commands = factory();
    this.decoder = decodeFactory((error, packet) => this.onPacketRead(error, packet));
    this.started = false;

    await toPromise(p.connect.bind(p));
    await toPromise(p.discoverAllServicesAndCharacteristics.bind(p));
    this.bindServices();
    await this.bindListeners();
  }

  async start() {
    // start
    await this.init();

    await this.write(this.antiDoSCharacteristic, "usetheforce...band");
    await toPromise(this.dfuControlCharacteristic.subscribe.bind(this.dfuControlCharacteristic))
    await toPromise(this.apiV2Characteristic.subscribe.bind(this.apiV2Characteristic))

    this.started = true;

    await this.wake();
  }

  bindServices() {
    this.peripheral.services.forEach(s => s.characteristics.forEach(c => {
      console.log(c.uuid);
      if (c.uuid === CharacteristicUUID.antiDoSCharacteristic) {
        this.antiDoSCharacteristic = c;
      } else if (c.uuid === CharacteristicUUID.apiV2Characteristic) {
        this.apiV2Characteristic = c;
      } else if (c.uuid === CharacteristicUUID.dfuControlCharacteristic) {
        this.dfuControlCharacteristic = c;
      } else if (c.uuid === CharacteristicUUID.dfuInfoCharacteristic) {
        this.dfuInfoCharacteristic = c;
      }
    }));
  }

  async bindListeners() {
    this.apiV2Characteristic.on('read', (data: Buffer, isNotification: boolean) => this.onApiRead(data, isNotification));
    this.apiV2Characteristic.on('notify', (data: Buffer, isNotification: boolean) => this.onApiNotify(data, isNotification));
    this.dfuControlCharacteristic.on('notify', (data: Buffer, isNotification: boolean) => this.onDFUControlNotify(data, isNotification));
  }

  async onExecute(item: QueuePayload) {
    if (!this.started) return;

    await this.write(item.characteristic, item.command.raw);
  }

  match(commandA: QueuePayload, commandB: QueuePayload) {
    return commandA.command.deviceId === commandB.command.deviceId &&
      commandA.command.commandId === commandB.command.commandId &&
      commandA.command.sequenceNumber === commandB.command.sequenceNumber;
  }

  onPacketRead(error: string, command: CommandWithRaw) {
    if (error) {
      console.error('There was a parse error', error);
    } else {
      this.queue.onCommandProcessed({
        command
      });
    }
  }

  onApiRead(data: Buffer, isNotification: boolean) {
    // console.log('READAPI', data, isNotification)
    data.forEach(byte => this.decoder.add(byte));
  }

  onApiNotify(data: any, isNotification: any) {
    return this.wake();
  }

  onDFUControlNotify(data: any, isNotification: any) {
    return this.write(this.dfuControlCharacteristic, new Uint8Array([0x30]));
  }

  write(c: Characteristic, data: Uint8Array | string) {
    let buff;
    if (typeof data === 'string') {
      buff = Buffer.from(data);
    } else {
      buff = new Buffer(data);
    }
    return toPromise(c.write.bind(c, buff, true));;
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

  roll(speed: number, heading: number, flags: Array<number>) {
    return this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.driving.drive(speed, heading, flags)
    });
  }

  async rollTime(speed: number, heading: number, time: number, flags: Array<number>) {
    let drive: boolean = true;
    console.log('DRIVE');
    setTimeout(() => drive = false, time);
    while(drive) {
      await this.queue.queue({
        characteristic: this.apiV2Characteristic,
        command: this.commands.driving.drive(speed, heading, flags)
      });
    }
    console.log('STOP');
    await this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.driving.drive(0, heading, flags)
    });
  }
}