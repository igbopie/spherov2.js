import { starter } from './utils/starter';
import { wait } from 'spherov2.js';
import { exit } from 'shelljs';
import { RollableToy } from 'spherov2.js';

export const wakeSleep = async (toy: RollableToy) => {
  await toy.setMainLedColor(255, 0, 0);
  await toy.setMainLedColor(0, 0, 255);
  await wait(2000);
  await toy.sleep();
  await toy.destroy();
  exit(0);
};

starter(wakeSleep);
