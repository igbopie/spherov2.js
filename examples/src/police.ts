import { Scanner, SpheroMini, Utils } from 'spherov2.js';

const WAIT_TIME: number = 100;
export const police = async (toy: SpheroMini) => {
  while (true) {
    await toy.setMainLedColor(0xFF, 0, 0);
    await Utils.wait(WAIT_TIME);
    await toy.setMainLedColor(0, 0, 0xFF);
    await Utils.wait(WAIT_TIME);
  }
};

const main = async () => {
  const sphero = await Scanner.findSpheroMini();
  if (sphero) {
    police(sphero);
  }
};

main();
