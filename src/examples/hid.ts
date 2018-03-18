
import { findSpheroMini } from './lib/scanner';
import { hid } from './lib/hid';

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {
    hid(sphero);
  }
};

main();
