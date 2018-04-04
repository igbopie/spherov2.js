import { findSpheroMini } from './lib/scanner';
import { patrol } from './lib/patrol';

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {
    patrol(sphero);
  }
};

main();
