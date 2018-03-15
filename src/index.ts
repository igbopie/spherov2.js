/* tslint:disable */
import { SpheroMini } from './toys/sphero-mini';
import { findToys } from './scanner';
import cmdPlay from './examples/cmd-play';
import patrol from './examples/patrol';
import hid from './examples/hid';
import { wait } from './utils';

const main = async () => {
  const discovered = await findToys();
  if (discovered.length > 0) {
    const toy: SpheroMini = new SpheroMini(discovered[0].peripheral);
    console.log('Starting...');
    await toy.start();
    console.log('Started');
    let version = await toy.appVersion();
    console.log('Version', version);
    let battery = await toy.batteryVoltage();
    console.log(battery);
    hid(toy);
  } else {
    console.log('Not found');
  }
};

main();
