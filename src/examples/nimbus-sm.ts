
import { findSpheroMini } from './lib/scanner';
import { hid } from './lib/nimbus-sphero';

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {
    hid(sphero);
  }
};

main();
