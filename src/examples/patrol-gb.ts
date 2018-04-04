import { findBB9E } from './lib/scanner';
import { patrol } from './lib/patrol';

const main = async () => {
  const sphero = await findBB9E();
  if (sphero) {
    patrol(sphero);
  }
};

main();
