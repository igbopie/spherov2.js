import { Scanner, SpheroMini, Event, Utils } from 'spherov2.js';

const beep = async (sphero: SpheroMini) => {
  await sphero.setMainLedColor(0xFF, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0xFF, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0xFF, 0xFF, 0xFF);
};

const main = async () => {
  const sphero = await Scanner.findSpheroMini();
  if (sphero) {
    await sphero.configureCollisionDetection();
    sphero.on(Event.onCollision, () => {

      // tslint:disable-next-line:no-console
      console.log('COLLISION');
      beep(sphero);
    });

    while (true) {
      await Utils.wait(1000);
    }
  }
};

main();
