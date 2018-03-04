import * as noble from 'noble';
import { Toy } from './toy';
import { wait } from './utils';
import { Peripheral } from 'noble';


interface ToyAdvertisement {
  prefix: string,
  name: string
}

interface ToyDiscovered extends ToyAdvertisement {
  peripheral: Peripheral
}

const ValidToys:Array<ToyAdvertisement> = [
  // {
  //   prefix: 'LM-',
  //   name: 'Lighting McQueen'
  // },
  {
    prefix: 'SM-',
    name: 'Sphero Mini'
  }
];

const discover = async (toys: Array<ToyDiscovered>, p: Peripheral) => {
  const { advertisement, uuid } = p;
  const { localName = '' } = advertisement;
  ValidToys.forEach( async ToyAdvertisement => {
    if (localName.indexOf(ToyAdvertisement.prefix) === 0) {
      console.log(`Detected ${ToyAdvertisement.name}: ${uuid}`, );
      toys.push({
        ...ToyAdvertisement,
        peripheral: p
      });
    }
  })
};

const findToys = async () => {
  const toys: Array<ToyDiscovered> = [];
  noble.on('discover', discover.bind(this, toys));
  noble.startScanning(); // any service UUID, no duplicates
  await wait(10000);
  noble.stopScanning();
  noble.removeListener('discover', discover.bind(this, toys));
  return toys;
}
let toy: Toy;
const main = async () => {
  const discovered = await findToys();
  if (discovered.length > 0) {
    toy = new Toy(discovered[0].peripheral);
    await wait(10000);
    // patrol();
    manual();
  } else {
    console.log('Not found');
  }
};

const patrol = async () => {
  while(true) {
    await toy.roll(100, 270, []);
    await wait(5000);
    await toy.roll(100, 0, []);
    await wait(5000);
    await toy.roll(100, 90, []);
    await wait(5000);
    await toy.roll(100, 180, []);
    await wait(5000);
  }
};
const manual = () => {

  const readline = require('readline');

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  let heading = 0;
  let speed = 80;
  process.stdin.on('keypress', (key, symbol) => {

    if (symbol.name === 'up') {
      heading = 0;
      toy.roll(speed, heading, [])
    } else if (symbol.name === 'left') {
      heading = 270;
      toy.roll(speed, heading, [])
    } else if (symbol.name === 'right') {
      heading = 90;
      toy.roll(speed, heading, [])
    } else if (symbol.name === 'down') {
      heading = 180;
      toy.roll(speed, heading, [])
    } else if (key === 'q') {
      speed += 10;
      console.log('speed', speed);
    } else if (key === 'z') {
      speed -= 10;
      console.log('speed', speed);
    } else if (key === 'p') {
      process.exit();
    } else if (key === 's') {
      toy.sleep();
    } else if (key === 'a') {
      toy.wake();
    }
    console.log(symbol.name, heading);
  })
};


main();