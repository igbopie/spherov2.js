import { SpheroMini } from '../toys/sphero-mini';
import { wait } from '../utils';
import { findSpheroMini } from './lib/scanner';

const PATROL_TIME: number = 2000;
const WAIT_TIME: number = 2000;
const SPEED: number = 100;
export const patrol = async (toy: SpheroMini) => {
  while (true) {
    await toy.rollTime(SPEED, 270, PATROL_TIME, []);
    await wait(WAIT_TIME);
    await toy.rollTime(SPEED, 0, PATROL_TIME, []);
    await wait(WAIT_TIME);
    await toy.rollTime(SPEED, 90, PATROL_TIME, []);
    await wait(WAIT_TIME);
    await toy.rollTime(SPEED, 180, PATROL_TIME, []);
    await wait(WAIT_TIME);
  }
};

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {
    patrol(sphero);
  }
};

main();
