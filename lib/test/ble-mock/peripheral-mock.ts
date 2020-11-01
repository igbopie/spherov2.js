import { Peripheral, Service, Characteristic } from '@abandonware/noble';
import { CharacteristicUUID, ServicesUUID } from '../../src/toys/types';
import {
  CharasteristicMock,
  ICharacteristicListener,
} from './characteristic-mock';

export default class PeripheralMock
  implements ICharacteristicListener, Peripheral {
  public services: Service[] = [];
  private connected = false;
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
    const controlService: Service = {
      characteristics: [
        (new CharasteristicMock(
          CharacteristicUUID.apiV2Characteristic,
          this
        ) as unknown) as Characteristic,
        (new CharasteristicMock(
          CharacteristicUUID.antiDoSCharacteristic,
          this
        ) as unknown) as Characteristic,
      ],
      uuid: ServicesUUID.apiV2ControlService,
    } as Service;
    const dfuService: Service = {
      characteristics: [
        (new CharasteristicMock(
          CharacteristicUUID.dfuControlCharacteristic,
          this
        ) as unknown) as Characteristic,
        new CharasteristicMock(CharacteristicUUID.dfuInfoCharacteristic, this),
      ],
      uuid: ServicesUUID.nordicDfuService,
    } as Service;
    this.services = [controlService, dfuService];
    callback('', [], []);
  }

  public onSubscribe(c: CharasteristicMock): void {
    const fn = this.listener[c.uuid] && this.listener[c.uuid].notify;
    if (fn) {
      setTimeout(() => fn(Buffer.from([]), true), 1);
    }
  }

  public onWrite(c: CharasteristicMock, buf: Buffer, notify: boolean): void {
    const fn = this.listener[c.uuid] && this.listener[c.uuid].read;
    if (fn) {
      setTimeout(() => fn(buf, notify), 1);
    }
  }

  // TODO
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public on(
    c: CharasteristicMock,
    eventName: string,
    fn: (data: Buffer, isNotification: boolean) => void
  ): void {
    if (!this.listener[c.uuid]) {
      this.listener[c.uuid] = {};
    }
    this.listener[c.uuid][eventName] = fn;
  }
}
