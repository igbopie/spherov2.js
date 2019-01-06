import { Scanner } from 'spherov2.js-lib';
import { patrol } from './utils/patrol';

const main = async () => {
  const sphero = await Scanner.findBB9E();
  if (sphero) {
    patrol(sphero);
  }
};

main();
