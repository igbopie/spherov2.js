import { ICharacteristic } from '../../src/ble';

export interface ICharacteristicListener {
  onSubscribe: (c: CharasteristicMock) => void;
  onWrite: (c: CharasteristicMock, buf: Buffer, notify: boolean) => void;
  on: (c: CharasteristicMock, eventName: string, fn: (data: Buffer, isNotification: boolean) => void) => void;
}

export class CharasteristicMock implements ICharacteristic {
  public uuid: string;
  public listener: ICharacteristicListener;
  constructor(uuid: string, listener: ICharacteristicListener) {
    this.uuid = uuid;
    this.listener = listener;
  }
  public subscribe(cb: (error?: string) => void): void {
    this.listener.onSubscribe(this);
    cb();
  }
  public write(buf: Buffer, notify: boolean, cb: (error?: string) => void): void {
    this.listener.onWrite(this, buf, notify);
    cb();
  }
  public on(eventName: string, fn: (data: Buffer, isNotification: boolean) => void): void {
    this.listener.on(this, eventName, fn);
  }
}
