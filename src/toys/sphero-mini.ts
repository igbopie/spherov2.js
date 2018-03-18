
import { number } from '../commands/decoder';
// tslint:disable-next-line:no-unused-variable
import { Core, IQueuePayload } from './core';
import { IToyAdvertisement } from './types';

export class SpheroMini extends Core {
  public static advertisement: IToyAdvertisement = {
    name: 'Sphero Mini',
    prefix: 'SM-',
  };

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

  public async appVersion() {
    const response = await this.queueCommand(this.commands.systemInfo.appVersion());
    return {
      major: number(response.command.payload, 1),
      minor: number(response.command.payload, 3),
    };
  }

  public enableCollisionDetection() {
    return this.queueCommand(this.commands.sensor.enableCollisionAsync());
  }

  public configureCollisionDetection(
    xThreshold: number = 100,
    yThreshold: number  = 100,
    xSpeed: number = 100,
    ySpeed: number = 100,
    deadTime: number = 10,
    method: number = 0x01) {
    return this.queueCommand(
      this.commands.sensor.configureCollision(xThreshold, yThreshold, xSpeed, ySpeed, deadTime, method),
    );
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

  public something1() {
    return this.queueCommand(this.commands.systemInfo.something());
  }

  public something2() {
    return this.queueCommand(this.commands.power.something2());
  }

  public something3() {
    return this.queueCommand(this.commands.power.something3());
  }

  public something4() {
    return this.queueCommand(this.commands.power.something4());
  }

  public something5() {
    return this.queueCommand(this.commands.somethingApi.something5());
  }

  public something6() {
    return this.queueCommand(this.commands.systemInfo.something6());
  }

  public something7() {
    return this.queueCommand(this.commands.systemInfo.something7());
  }
}
