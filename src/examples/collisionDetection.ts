import { SpheroMini } from '../toys/sphero-mini';
import { wait } from '../utils';
import { findSpheroMini } from './lib/scanner';
import { Event } from '../toys/core';

const beep = async (sphero: SpheroMini) => {
  await sphero.setMainLedColor(0xFF, 0, 0);
  await wait(100);
  await sphero.setMainLedColor(0, 0, 0);
  await wait(100);
  await sphero.setMainLedColor(0xFF, 0, 0);
  await wait(100);
  await sphero.setMainLedColor(0, 0, 0);
  await wait(100);
  await sphero.setMainLedColor(0xFF, 0xFF, 0xFF);
};

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {
    await sphero.configureCollisionDetection();
    sphero.on(Event.onCollision, () => {

      // tslint:disable-next-line:no-console
      console.log('COLLISION');
      beep(sphero);
    });

    while (true) {
      await wait(1000);
    }
  }
};

main();
