import { Scanner } from 'spherov2.js-lib';
import { hid } from './utils/hid-lm';

const main = async () => {
  const lm = await Scanner.findLightningMcQueen();
  if (lm) {
    hid(lm);
  }
};

main();
