import { IToyAdvertisement } from './types';
import { RollableToy } from './rollable-toy';

export class SpheroBolt extends RollableToy {
  public static advertisement: IToyAdvertisement = {
    name: 'Sphero Bolt',
    prefix: 'SB-',
    class: SpheroBolt
  };

  protected maxVoltage: number = 3.9;
  protected minVoltage: number = 3.55;
}
