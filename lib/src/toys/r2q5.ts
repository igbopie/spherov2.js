import { IToyAdvertisement } from './types';
import { R2D2 } from './r2d2';

export class R2Q5 extends R2D2 {
  public static advertisement: IToyAdvertisement = {
    name: 'R2-Q5',
    prefix: 'Q5-',
    class: R2Q5
  };
}
