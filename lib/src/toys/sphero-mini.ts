import { IToyAdvertisement } from './types';
import { RollableToy } from './rollable-toy';
import { IQueuePayload } from './core';

export class SpheroMini extends RollableToy {
  public static advertisement: IToyAdvertisement = {
    name: 'Sphero Mini',
    prefix: 'SM-',
    class: SpheroMini
  };

  protected maxVoltage: number = 3.65;
  protected minVoltage: number = 3.4;

  public something1(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.systemInfo.something());
  }

  public something2(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.something2());
  }

  public something3(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.something3());
  }

  public something4(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.something4());
  }

  public something5(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.somethingApi.something5());
  }

  public something6(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.systemInfo.something6());
  }

  public something7(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.systemInfo.something7());
  }
}
