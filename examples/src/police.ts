import { SpheroMini, Utils } from 'spherov2.js';
import { starter } from './utils/starter';

const WAIT_TIME = 100;
export const police = async (toy: SpheroMini): Promise<void> => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await toy.setMainLedColor(0xff, 0, 0);
    await Utils.wait(WAIT_TIME);
    await toy.setMainLedColor(0, 0, 0xff);
    await Utils.wait(WAIT_TIME);
  }
};

starter(police);
