import { Peripheral, Service, Characteristic } from 'noble';
import { CharacteristicUUID, ServicesUUID } from '../../src/toys/types';
import {
  CharasteristicMock,
  ICharacteristicListener
} from './characteristic-mock';

export default class PeripheralMock
  implements ICharacteristicListener, Peripheral {
  public services: Service[] = [];
  private connected: boolean = false;
  private listener: {
    [key: string]: {
      [key: string]: (data: Buffer, isNotification: boolean) => void;
    };
  } = {};

  public connect(cb: (error?: string) => void): void {
    this.connected = true;
    cb();
  }

  public discoverAllServicesAndCharacteristics(
    callback?: (
      error: string,
      services: Service[],
      characteristics: Characteristic[]
    ) => void
  ): void {
    this.services = [
      {
        characteristics: [
          // @ts-ignore
          new CharasteristicMock(CharacteristicUUID.apiV2Characteristic, this),
          // @ts-ignore
          new CharasteristicMock(CharacteristicUUID.antiDoSCharacteristic, this)
        ],
        uuid: ServicesUUID.apiV2ControlService
      },
      {
        characteristics: [
          // @ts-ignore
          new CharasteristicMock(
            CharacteristicUUID.dfuControlCharacteristic,
            this
          ),
          // @ts-ignore
          new CharasteristicMock(CharacteristicUUID.dfuInfoCharacteristic, this)
        ],
        uuid: ServicesUUID.nordicDfuService
      }
    ];
    callback('', [], []);
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

  // @ts-ignore
  public on(
    c: CharasteristicMock,
    eventName: string,
    fn: (data: Buffer, isNotification: boolean) => void
  ) {
    if (!this.listener[c.uuid]) {
      this.listener[c.uuid] = {};
    }
    this.listener[c.uuid][eventName] = fn;
  }
}
