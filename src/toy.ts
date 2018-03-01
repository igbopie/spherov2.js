
import { toPromise, wait } from './utils';
import { factory } from './commands';
import { Peripheral, Characteristic } from 'noble';

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

export class Toy {
  peripheral: Peripheral;
  apiV2Characteristic?: Characteristic;
  dfuControlCharacteristic?: Characteristic;
  dfuInfoCharacteristic?: Characteristic;
  antiDoSCharacteristic?: Characteristic;
  commands: typeof commandsType;

  constructor(p: Peripheral) {
    this.peripheral = p;
    this.init();
  };

  async init() {
    const p = this.peripheral

    this.commands = factory();

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

  onApiRead(data: Buffer, isNotification: boolean) {
    console.log('READAPI', data, isNotification)
  }

  onApiNotify(data: any, isNotification: any) {
    return this.wake();
  }

  onDFUControlNotify(data: any, isNotification: any) {
    return this.write(this.dfuControlCharacteristic, [0x30]);
  }

  write(c: Characteristic, data: Array<number> | string) {
    let buff = new Buffer(typeof data === 'string' ? data : new Uint8Array(data));
    console.log('Writing', buff);
    return toPromise(c.write.bind(c, buff, true));
  }

  wake() {
    return this.write(this.apiV2Characteristic, this.commands.power.wake());
  }

  sleep() {
    return this.write(this.apiV2Characteristic, this.commands.power.sleep());
  }

  roll(speed, heading, flags) {
    return this.write(this.apiV2Characteristic, this.commands.driving.drive(speed, heading, flags));
  }
}