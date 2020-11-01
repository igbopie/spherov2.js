import { RollableToy, Utils } from 'spherov2.js';

const PATROL_TIME = 2000;
const WAIT_TIME = 2000;
const SPEED = 100;
export const patrol = async (toy: RollableToy) => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await toy.rollTime(SPEED, 270, PATROL_TIME, []);
    await Utils.wait(WAIT_TIME);
    await toy.rollTime(SPEED, 0, PATROL_TIME, []);
    await Utils.wait(WAIT_TIME);
    await toy.rollTime(SPEED, 90, PATROL_TIME, []);
    await Utils.wait(WAIT_TIME);
    await toy.rollTime(SPEED, 180, PATROL_TIME, []);
    await Utils.wait(WAIT_TIME);
  }
};
