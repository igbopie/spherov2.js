import { SpheroMini } from '../toys/sphero-mini';
import { wait } from '../utils';
import { findSpheroMini } from './lib/scanner';

const WAIT_TIME: number = 100;
export const police = async (toy: SpheroMini) => {
  while (true) {
    await toy.setMainLedColor(0xFF, 0, 0);
    await wait(WAIT_TIME);
    await toy.setMainLedColor(0, 0, 0xFF);
    await wait(WAIT_TIME);
  }
};

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {
    police(sphero);
  }
};

main();
