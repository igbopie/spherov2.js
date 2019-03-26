import { Toys, Scanner, Core } from 'spherov2.js';
import { patrol } from './utils/patrol';

const robot: string = `SB-`;
export const starter = async <T extends Core>(fn: (sphero: T) => void) => {
  const adv = Toys.find(toy => toy.prefix === robot);
  const sphero = await Scanner.find<T>(adv);
  if (sphero) {
    fn(sphero);
  }
};

document.querySelector('button').onclick = () => {
  starter(patrol);
};
