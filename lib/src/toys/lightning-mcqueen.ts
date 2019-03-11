import { IToyAdvertisement } from './types';
import { RollableToy } from './rollable-toy';
import { IQueuePayload } from './core';

export class LightningMcQueen extends RollableToy {
  public static advertisement: IToyAdvertisement = {
    name: 'Lightning McQueen',
    prefix: 'LM-',
    class: LightningMcQueen
  };

  public driveAsRc(heading: number, speed: number): Promise<IQueuePayload> {
    const cmd = this.commands.driving.driveAsRc(heading, speed);
    // console.log(Array.from(cmd.raw).map((x) => x.toString(16).padStart(2, '0')).join(':'));
    return this.queueCommand(cmd);
  }
}
