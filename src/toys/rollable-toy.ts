// tslint:disable-next-line:no-unused-variable
import { Core, IQueuePayload } from './core';

export class RollableToy extends Core {

  public roll(speed: number, heading: number, flags: number[]) {
    return this.queueCommand( this.commands.driving.drive(speed, heading, flags));
  }

  public async rollTime(speed: number, heading: number, time: number, flags: number[]) {
    let drive: boolean = true;
    setTimeout(() => drive = false, time);
    while (drive) {
      await this.queueCommand(this.commands.driving.drive(speed, heading, flags));
    }
    await this.queueCommand(this.commands.driving.drive(0, heading, flags));
  }

  public allLEDsRaw(payload: number[]) {
    return this.queueCommand(this.commands.userIo.allLEDsRaw(payload));
  }

  public setBackLedIntensity(i: number) {
    return this.queueCommand(this.commands.userIo.setBackLedIntensity(i));
  }

  public setMainLedBlueIntensity(i: number) {
    return this.queueCommand(this.commands.userIo.setMainLedBlueIntensity(i));
  }

  public setMainLedColor(r: number, g: number, b: number) {
    return this.queueCommand(this.commands.userIo.setMainLedColor(r, g, b));
  }

  public setMainLedGreenIntensity(i: number) {
    return this.queueCommand(this.commands.userIo.setMainLedGreenIntensity(i));
  }

  public setMainLedRedIntensity(i: number) {
    return this.queueCommand(this.commands.userIo.setMainLedRedIntensity(i));
  }
}
