
import { findLightningMcQueen } from './lib/scanner';
import { hid } from './lib/hid-lm';

const main = async () => {
  const lm = await findLightningMcQueen();
  if (lm) {
    hid(lm);
  }
};

main();
