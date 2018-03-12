
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

}
