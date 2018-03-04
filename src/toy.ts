
import { toPromise, wait } from './utils';
import { factory } from './commands';
import { factory as decodeFactory } from './commands/decoder';
import { Peripheral, Characteristic } from 'noble';
import { CommandResponse } from './commands/types';

enum ServicesUUID {
  apiV2ControlService = '00010001574f4f2053706865726f2121',
  nordicDfuService =    '00020001574f4f2053706865726f2121'
};

enum CharacteristicUUID {
  apiV2Characteristic =       '00010002574f4f2053706865726f2121',
  dfuControlCharacteristic =  '00020002574f4f2053706865726f2121',
  dfuInfoCharacteristic =     '00020004574f4f2053706865726f2121',
  antiDoSCharacteristic =     '00020005574f4f2053706865726f2121'
};


// TS workaround until 2.8 (not released), then ReturnType<factory>
const commandsType = (false as true) && factory();
const decodeType = (false as true) && decodeFactory((_) => null);

interface CommandQeueItem {
  promise: PromiseLike<any>,
  command: Uint8Array,
  characteristic: Characteristic,
  success: () => any,
  reject: () => any
}

export class Toy {
  peripheral: Peripheral;
  apiV2Characteristic?: Characteristic;
  dfuControlCharacteristic?: Characteristic;
  dfuInfoCharacteristic?: Characteristic;
  antiDoSCharacteristic?: Characteristic;
  commands: typeof commandsType;
  decoder: typeof decodeType;
  commandQeue: Array<CommandQeueItem>;
  executing: CommandQeueItem | null;

  constructor(p: Peripheral) {
    this.peripheral = p;
    this.init();
  }

  async init() {
    const p = this.peripheral

    this.commandQeue = [];
    this.executing = null;
    this.commands = factory();
    this.decoder = decodeFactory((error, packet) => this.onPacketRead(error, packet));

    await toPromise(p.connect.bind(p));
    await toPromise(p.discoverAllServicesAndCharacteristics.bind(p));
    this.bindServices();
    await this.bindListeners();

    // start
    await this.write(this.antiDoSCharacteristic, "usetheforce...band");
    await toPromise(this.dfuControlCharacteristic.subscribe.bind(this.dfuControlCharacteristic))
    await toPromise(this.apiV2Characteristic.subscribe.bind(this.apiV2Characteristic))
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
    this.apiV2Characteristic.on('read', (...args) => this.onApiRead(...args));
    this.apiV2Characteristic.on('notify', (...args) => this.onApiNotify(...args));
    this.dfuControlCharacteristic.on('notify', (...args) => this.onDFUControlNotify(...args));
  }

  onPacketRead(error: string, packet: CommandResponse) {
    if (error) {
      console.error('There was a parse error', error);
    } else if (this.executing){
      const { deviceId, commandId, sequenceNumber } = packet;
      const [s, flags, dId, cId, sNumber] = this.executing.command;
      if (deviceId === dId && commandId === cId && sequenceNumber === sNumber) {
        console.log('RESPONSE COMMAND');
        this.executing.success();
      } else {
        console.log('RESPONSE COMMAND ERROR');
        this.executing.reject();
      }

      this.executing = null;
    } else {
      console.log('PACKET RECEIVED BUT NOT EXECUTING', packet);
    }

    this.processCommand();
  }

  onApiRead(data: Buffer, isNotification: boolean) {
    console.log('READAPI', data, isNotification)
    data.forEach(byte => this.decoder.add(byte));
  }

  onApiNotify(data: any, isNotification: any) {
    return this.wake();
  }

  onDFUControlNotify(data: any, isNotification: any) {
    return this.write(this.dfuControlCharacteristic, new Uint8Array([0x30]));
  }

  qeue(c: Characteristic, data: Uint8Array) {
    let success;
    let reject;
    let promise = new Promise((_success, _reject)=> {
      success = _success;
      reject = _reject;
    });

    // todo add timeout;
    this.commandQeue.push({
      characteristic: c,
      command: data,
      promise,
      success,
      reject
    });
    this.processCommand();
    return promise;
  }

  write(c: Characteristic, data: Uint8Array | string) {
    let buff = new Buffer(data);
    return toPromise(c.write.bind(c, buff, true));;
  }

  processCommand() {
    if (!this.executing) {
      this.executing = this.commandQeue.shift();
      if (this.executing) {
        console.log('WRITING COMMAND');
        this.write(this.executing.characteristic, this.executing.command);
      }
    }
  }

  wake() {
    return this.qeue(this.apiV2Characteristic, this.commands.power.wake());
  }

  sleep() {
    return this.qeue(this.apiV2Characteristic, this.commands.power.sleep());
  }

  roll(speed, heading, flags) {
    return this.qeue(this.apiV2Characteristic, this.commands.driving.drive(speed, heading, flags));
  }
}