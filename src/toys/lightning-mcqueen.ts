// tslint:disable-next-line:no-unused-variable
import { Core, IQueuePayload } from './core';
import { IToyAdvertisement } from './types';

export class LightningMcQueen extends Core {
  public static advertisement: IToyAdvertisement = {
    name: 'Lightning McQueen',
    prefix: 'LM-',
    class: LightningMcQueen,
  };

  public driveAsRc(heading: number, speed: number) {
    const cmd = this.commands.driving.driveAsRc(heading, speed);
    // console.log(Array.from(cmd.raw).map((x) => x.toString(16).padStart(2, '0')).join(':'));
    return this.queueCommand(cmd);
  }

}
