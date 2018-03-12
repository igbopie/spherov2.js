/* tslint:disable */
import { Toy } from './toy';
import { findToys } from './scanner';
// import cmdPlay from './examples/cmd-play';
// import patrol from './examples/patrol';

const main = async () => {
  const discovered = await findToys();
  if (discovered.length > 0) {
    const toy: Toy = new Toy(discovered[0].peripheral);
    console.log('Starting...');
    await toy.start();
    console.log('Started');
    let version = await toy.appVersion();
    console.log('Version', version);
    //patrol(toy);
    process.exit(0);
  } else {
    console.log('Not found');
  }
};

main();
