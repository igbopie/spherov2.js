
import { ICharacteristic, IPeripheral } from './ble';
import { factory } from './commands';
import { factory as decodeFactory, number } from './commands/decoder';
import { ICommandWithRaw } from './commands/types';
import { Queue } from './queue';
import { CharacteristicUUID } from './types';
import { toPromise } from './utils';

// TS workaround until 2.8 (not released), then ReturnType<factory>
const commandsType = (false as true) && factory();
const decodeType = (false as true) && decodeFactory((_) => null);

export interface IQueuePayload {
  command: ICommandWithRaw;
  characteristic?: ICharacteristic;
}

export class Toy {
  private peripheral: IPeripheral;
  private apiV2Characteristic?: ICharacteristic;
  private dfuControlCharacteristic?: ICharacteristic;
  // private dfuInfoCharacteristic?: ICharacteristic;
  private antiDoSCharacteristic?: ICharacteristic;
  private commands: typeof commandsType;
  private decoder: typeof decodeType;
  private started: boolean;
  private queue: Queue<IQueuePayload>;
  private initPromise: Promise<void>;
  private initPromiseResolve: () => any;

  constructor(p: IPeripheral) {
    this.peripheral = p;
  }

  public wake() {
    return this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.power.wake(),
    });
  }

  public sleep() {
    return this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.power.sleep(),
    });
  }

  public roll(speed: number, heading: number, flags: number[]) {
    return this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.driving.drive(speed, heading, flags),
    });
  }

  public async rollTime(speed: number, heading: number, time: number, flags: number[]) {
    let drive: boolean = true;
    setTimeout(() => drive = false, time);
    while (drive) {
      await this.queue.queue({
        characteristic: this.apiV2Characteristic,
        command: this.commands.driving.drive(speed, heading, flags),
      });
    }
    await this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.driving.drive(0, heading, flags),
    });
  }

  public async appVersion() {
    const response = await this.queue.queue({
      characteristic: this.apiV2Characteristic,
      command: this.commands.systemInfo.appVersion(),
    });
    return {
      major: number(response.command.payload, 1),
      minor: number(response.command.payload, 3),
    };
  }

  public async start() {
    // start
    await this.init();
    await this.write(this.antiDoSCharacteristic, 'usetheforce...band');
    await toPromise(this.dfuControlCharacteristic.subscribe.bind(this.dfuControlCharacteristic));
    await toPromise(this.apiV2Characteristic.subscribe.bind(this.apiV2Characteristic));
    await this.initPromise;
    this.initPromiseResolve = null;
    this.started = true;

    try {
      await this.wake();
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error('error', e);
    }
  }

  private async init() {
    const p = this.peripheral;

    this.initPromise = new Promise(async (resolve) => {
      this.initPromiseResolve = resolve;
    });

    this.queue = new Queue<IQueuePayload>({
      match: (cA, cB) => this.match(cA, cB),
      onExecute: (item) => this.onExecute(item),
    });
    this.commands = factory();
    this.decoder = decodeFactory((error, packet) => this.onPacketRead(error, packet));
    this.started = false;

    await toPromise(p.connect.bind(p));
    await toPromise(p.discoverAllServicesAndCharacteristics.bind(p));
    this.bindServices();
    this.bindListeners();
  }

  private async onExecute(item: IQueuePayload) {
    if (!this.started) {
      return;
    }

    await this.write(item.characteristic, item.command.raw);
  }

  private match(commandA: IQueuePayload, commandB: IQueuePayload) {
    return commandA.command.deviceId === commandB.command.deviceId &&
      commandA.command.commandId === commandB.command.commandId &&
      commandA.command.sequenceNumber === commandB.command.sequenceNumber;
  }

  private bindServices() {
    this.peripheral.services.forEach((s) => s.characteristics.forEach((c) => {
      if (c.uuid === CharacteristicUUID.antiDoSCharacteristic) {
        this.antiDoSCharacteristic = c;
      } else if (c.uuid === CharacteristicUUID.apiV2Characteristic) {
        this.apiV2Characteristic = c;
      } else if (c.uuid === CharacteristicUUID.dfuControlCharacteristic) {
        this.dfuControlCharacteristic = c;
      }
      // else if (c.uuid === CharacteristicUUID.dfuInfoCharacteristic) {
      //   this.dfuInfoCharacteristic = c;
      // }
    }));
  }

  private bindListeners() {
    this.apiV2Characteristic.on('read',
      (data: Buffer, isNotification: boolean) => this.onApiRead(data, isNotification));
    this.apiV2Characteristic.on('notify',
      (data: Buffer, isNotification: boolean) => this.onApiNotify(data, isNotification));
    this.dfuControlCharacteristic.on('notify',
      (data: Buffer, isNotification: boolean) => this.onDFUControlNotify(data, isNotification));
  }

  private onPacketRead(error: string, command: ICommandWithRaw) {
    if (error) {
      // tslint:disable-next-line:no-console
      console.error('There was a parse error', error);
    } else {
      this.queue.onCommandProcessed({ command });
    }
  }

  private onApiRead(data: Buffer, isNotification: boolean) {
    data.forEach((byte) => this.decoder.add(byte));
  }

  private onApiNotify(data: any, isNotification: any) {
    // nothing
    if (this.initPromiseResolve) {
      this.initPromiseResolve();
    }
  }

  private onDFUControlNotify(data: any, isNotification: any) {
    return this.write(this.dfuControlCharacteristic, new Uint8Array([0x30]));
  }

  private write(c: ICharacteristic, data: Uint8Array | string) {
    let buff;
    if (typeof data === 'string') {
      buff = Buffer.from(data);
    } else {
      buff = new Buffer(data);
    }
    return toPromise(c.write.bind(c, buff, true));
  }
}
