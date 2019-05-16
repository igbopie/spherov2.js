import { IToyAdvertisement, Stance } from './types';
import { RollableToy } from './rollable-toy';
import { IQueuePayload } from './core';

export class R2D2 extends RollableToy {
  public static advertisement: IToyAdvertisement = {
    name: 'R2-D2',
    prefix: 'D2-',
    class: R2D2
  };

  public wake(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.wake());
  }
  public sleep(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.sleep());
  }
  public playAudioFile(idx: number): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.playAudioFile(idx));
  }

  public turnDome(angle: number): Promise<IQueuePayload> {
    const res = this.calculateDomeAngle(angle);
    return this.queueCommand(this.commands.userIo.turnDome(res));
  }

  public setStance(stance: Stance): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.setStance(stance));
  }

  public playAnimation(animation: number): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.playAnimation(animation));
  }

  // TODO: Refractor this and simplify
  // utility calculation for dome rotation
  private calculateDomeAngle(angle: number) {
    const result = new Uint8Array(2);
    switch (angle) {
      case -1:
        result[0] = 0xbf;
        result[1] = 0x80;
        return result;
      case 0:
        result[0] = 0x00;
        result[1] = 0x00;
        return result;
      case 1:
        result[0] = 0x3f;
        result[1] = 0x80;
        return result;
    }
    let uAngle: number = Math.abs(angle);
    const hob = R2D2.hobIndex(uAngle);
    const unshift = Math.min(8 - hob, 6);
    const shift = 6 - unshift;

    // tslint:disable-next-line:no-bitwise
    uAngle = uAngle << unshift;
    if (angle < 0) {
      // tslint:disable-next-line:no-bitwise
      uAngle = 0x8000 | uAngle;
    }

    // tslint:disable-next-line:no-bitwise
    uAngle = 0x4000 | uAngle;

    // tslint:disable-next-line:no-bitwise
    const flagA = (0x04 & shift) >> 2;

    // tslint:disable-next-line:no-bitwise
    const flagB = (0x02 & shift) >> 1;

    // tslint:disable-next-line:no-bitwise
    const flagC = 0x01 & shift;
    if (flagA === 1) {
      // tslint:disable-next-line:no-bitwise
      uAngle |= 1 << 9;
    } else {
      // tslint:disable-next-line:no-bitwise
      uAngle &= uAngle ^ (1 << 9);
    }

    if (flagB === 1) {
      // tslint:disable-next-line:no-bitwise
      uAngle |= 1 << 8;
    } else {
      // tslint:disable-next-line:no-bitwise
      uAngle &= uAngle ^ (1 << 8);
    }

    if (flagC === 1) {
      // tslint:disable-next-line:no-bitwise
      uAngle |= 1 << 7;
    } else {
      // tslint:disable-next-line:no-bitwise
      uAngle &= uAngle ^ (1 << 7);
    }

    // tslint:disable-next-line:no-bitwise
    result[0] = 0x00ff & uAngle;

    // tslint:disable-next-line:no-bitwise
    result[1] = (0xff00 & uAngle) >> 8;

    return result;
  }

  private static hobIndex(val: number) {
    const values = new Uint16Array(2);
    values[1] = 0;
    values[0] = val;
    while (values[0] > 0) {
      // tslint:disable-next-line
      values[0] = values[0] >> 1;
      values[1] = values[1] + 1;
    }
    return values[1];
  }
}
