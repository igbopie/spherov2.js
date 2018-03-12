import { IPeripheral, IServices } from '../../src/ble';
import { CharacteristicUUID, ServicesUUID } from '../../src/toys/types';
import { CharasteristicMock, ICharacteristicListener } from './characteristic-mock';

export default class PeripheralMock implements IPeripheral, ICharacteristicListener {

  public services: IServices[] = [];
  private connected: boolean = false;
  private listener: { [key: string]: { [key: string]: (data: Buffer, isNotification: boolean) => void } } = {};

  public connect(cb: (error?: string) => void): void {
    this.connected = true;
    cb();
  }

  public discoverAllServicesAndCharacteristics(cb: (error?: string) => void): void {
    this.services = [{
      characteristics: [
        new CharasteristicMock(CharacteristicUUID.apiV2Characteristic, this),
        new CharasteristicMock(CharacteristicUUID.antiDoSCharacteristic, this),
      ],
      uuid: ServicesUUID.apiV2ControlService,
    },
    {
      characteristics: [
        new CharasteristicMock(CharacteristicUUID.dfuControlCharacteristic, this),
        new CharasteristicMock(CharacteristicUUID.dfuInfoCharacteristic, this),
      ],
      uuid: ServicesUUID.nordicDfuService,
    }];
    cb();
  }

  public onSubscribe(c: CharasteristicMock) {
    const fn = this.listener[c.uuid] && this.listener[c.uuid].notify;
    if (fn) {
      setTimeout(() => fn(Buffer.from([]), true), 1);
    }
  }

  public onWrite(c: CharasteristicMock, buf: Buffer, notify: boolean) {
    const fn = this.listener[c.uuid] && this.listener[c.uuid].read;
    if (fn) {
      setTimeout(() => fn(buf, notify), 1);
    }
  }

  public on(c: CharasteristicMock, eventName: string, fn: (data: Buffer, isNotification: boolean) => void) {
    if (!this.listener[c.uuid]) {
      this.listener[c.uuid] = {};
    }
    this.listener[c.uuid][eventName] = fn;
  }
}
