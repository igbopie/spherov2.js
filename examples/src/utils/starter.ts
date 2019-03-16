import { Toys, Scanner, Core } from 'spherov2.js';

const robot: string = `${process.argv[2]}-`;
export const starter = async <T extends Core>(fn: (sphero: T) => void) => {
  const adv = Toys.find(toy => toy.prefix === robot);
  const sphero = await Scanner.find<T>(adv);
  if (sphero) {
    fn(sphero);
  }
  return sphero;
};
