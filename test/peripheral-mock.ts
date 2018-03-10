import { Peripheral, Services, Characteristic } from "../src/ble";
import { ServicesUUID, CharacteristicUUID } from "../src/types";


interface CharacteristicListener {
  onSubscribe: (c: CharasteristicMock) => void,
  onWrite: (c: CharasteristicMock, buf: Buffer, notify: boolean) => void,
  on: (c: CharasteristicMock, eventName: string, fn: (data: Buffer, isNotification: boolean) => void) => void
}

class CharasteristicMock implements Characteristic {
  uuid: string;
  listener: CharacteristicListener;
  constructor(uuid: string, listener: CharacteristicListener) {
    this.uuid = uuid;
    this.listener = listener;
  }
  subscribe(cb:(error?: string) => void): void {
    this.listener.onSubscribe(this);
    cb();
  }
  write(buf: Buffer, notify: boolean, cb:(error?: string) => void): void {
    this.listener.onWrite(this, buf, notify);
    cb();
  }
  on(eventName: string, fn: (data: Buffer, isNotification: boolean) => void): void {
    this.listener.on(this, eventName, fn);
  }
}

export default class PeripheralMock implements Peripheral, CharacteristicListener {
  connected: boolean = false;
  services: Array<Services> = [];
  listener: { [key: string]: { [key: string]: (data: Buffer, isNotification: boolean) => void } } = {};

  connect(cb:(error?: string) => void): void {
    console.log('Connected');
    this.connected = true;
    cb();
  }

  discoverAllServicesAndCharacteristics(cb:(error?: string) => void): void {
    console.log('Discover Services');
    this.services = [{
      uuid: ServicesUUID.apiV2ControlService,
      characteristics: [
        new CharasteristicMock(CharacteristicUUID.apiV2Characteristic, this),
        new CharasteristicMock(CharacteristicUUID.antiDoSCharacteristic, this)
      ]
    },
    {
      uuid: ServicesUUID.nordicDfuService,
      characteristics: [
        new CharasteristicMock(CharacteristicUUID.dfuControlCharacteristic, this),
        new CharasteristicMock(CharacteristicUUID.dfuInfoCharacteristic, this)
      ]
    }];
    cb();
  }

  onSubscribe(c: CharasteristicMock) {
    let fn = this.listener[c.uuid] && this.listener[c.uuid].notify;
    if (fn) {
      console.log(`On Subscribe ${c.uuid}`);
      setTimeout(() => fn(Buffer.from([]), true), 1);
    }
  }

  onWrite(c: CharasteristicMock, buf: Buffer, notify: boolean) {
    let fn = this.listener[c.uuid] && this.listener[c.uuid].read;
    if (fn) {
      console.log(`On Write ${c.uuid}`);
      setTimeout(() => fn(buf, notify), 1);
    }
  }

  on(c: CharasteristicMock, eventName: string, fn: (data: Buffer, isNotification: boolean) => void) {
    if (!this.listener[c.uuid]) {
      this.listener[c.uuid] = {};
    }
    this.listener[c.uuid][eventName] = fn;
    console.log(`On ${c.uuid} ${eventName}`);
  }
}