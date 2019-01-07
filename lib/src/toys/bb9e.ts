import { IToyAdvertisement } from './types';
import { RollableToy } from './rollable-toy';

export class BB9E extends RollableToy {
  public static advertisement: IToyAdvertisement = {
    name: 'BB-9E',
    prefix: 'GB-',
    class: BB9E
  };
}
