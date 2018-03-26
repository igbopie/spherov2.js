
import { findLightintMcQueen } from './lib/scanner';
import { hid } from './lib/hid-lm';

const main = async () => {
  const lm = await findLightintMcQueen();
  if (lm) {
    hid(lm);
  }
};

main();
