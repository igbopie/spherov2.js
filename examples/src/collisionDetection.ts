import { Scanner, SpheroMini, Event, Utils } from 'spherov2.js';

const beep = async (sphero: SpheroMini) => {
  await sphero.setMainLedColor(0xff, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0xff, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0, 0, 0);
  await Utils.wait(100);
  await sphero.setMainLedColor(0xff, 0xff, 0xff);
};

const main = async () => {
  const sphero = await Scanner.findSpheroMini();
  if (sphero) {
    await sphero.configureCollisionDetection();
    sphero.on(Event.onCollision, () => {
      console.log('COLLISION');
      beep(sphero);
    });

    // eslint-disable-next-line no-constant-condition
    while (true) {
      await Utils.wait(1000);
    }
  }
};

main();
