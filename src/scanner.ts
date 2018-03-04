import { Peripheral } from "noble";
import * as noble from 'noble';
import { wait } from './utils';

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

export const findToys = async () => {
  const toys: Array<ToyDiscovered> = [];
  console.log('Scanning devices...');
  noble.on('discover', discover.bind(this, toys));
  noble.startScanning(); // any service UUID, no duplicates
  await wait(5000);
  noble.stopScanning();
  noble.removeListener('discover', discover.bind(this, toys));
  console.log('Done scanning devices.');
  return toys;
}
