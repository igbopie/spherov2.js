import { Scanner, Toys } from 'spherov2.js';
import { patrol } from './utils/patrol';
const robot: string = `${process.argv[2]}-`;
const main = async () => {
  const adv = Toys.find(toy => toy.prefix === robot);
  const sphero = await Scanner.find(adv);
  if (sphero) {
    patrol(sphero);
  }
};

main();
