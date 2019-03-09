import { hid } from './utils/nimbus-sphero';
import { Toys, Scanner } from 'spherov2.js';

const robot: string = `${process.argv[2]}-`;
const main = async () => {
  const adv = Toys.find(toy => toy.prefix === robot);
  const sphero = await Scanner.find(adv);
  if (sphero) {
    hid(sphero);
  }
};

main();
