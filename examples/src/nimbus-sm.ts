import { Scanner } from 'spherov2.js';
import { hid } from './utils/nimbus-sphero';

const main = async () => {
  const sphero = await Scanner.findSpheroMini();
  if (sphero) {
    hid(sphero);
  }
};

main();
