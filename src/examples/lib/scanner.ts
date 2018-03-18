import { Peripheral } from 'noble';
import * as noble from 'noble';
import { SpheroMini } from '../../toys/sphero-mini';
import { IToyAdvertisement } from '../../toys/types';
import { wait } from '../../utils';

export interface IToyDiscovered extends IToyAdvertisement {
  peripheral: Peripheral;
}

const validToys: IToyAdvertisement[] = [
  SpheroMini.advertisement,
  // {
  //   prefix: 'LM-',
  //   name: 'Lighting McQueen'
  // },
];

const discover = async (toys: IToyDiscovered[], p: Peripheral) => {
  const { advertisement, uuid } = p;
  const { localName = '' } = advertisement;
  validToys.forEach( async (toyAdvertisement) => {
    if (localName.indexOf(toyAdvertisement.prefix) === 0) {

      // tslint:disable-next-line:no-console
      console.log(`Detected ${toyAdvertisement.name}: ${uuid}`);
      toys.push({
        ...toyAdvertisement,
        peripheral: p,
      });
    }
  });
};

export const findToys = async () => {
  const toys: IToyDiscovered[] = [];
  // tslint:disable-next-line:no-console
  console.log('Scanning devices...');

  noble.on('discover', discover.bind(this, toys));
  noble.startScanning(); // any service UUID, no duplicates
  await wait(5000);
  noble.stopScanning();
  noble.removeListener('discover', discover.bind(this, toys));

  // tslint:disable-next-line:no-console
  console.log('Done scanning devices.');
  return toys;
};

export const findSpheroMini = async () => {
  const discovered = await findToys();
  if (discovered.length > 0) {
    const toy: SpheroMini = new SpheroMini(discovered[0].peripheral);

    // tslint:disable-next-line:no-console
    console.log('Starting...');
    await toy.start();

    // tslint:disable-next-line:no-console
    console.log('Started');
    const version = await toy.appVersion();

    // tslint:disable-next-line:no-console
    console.log('Version', version);
    const battery = await toy.batteryVoltage();

    // tslint:disable-next-line:no-console
    console.log(battery);

    return toy;
  } else {

    // tslint:disable-next-line:no-console
    console.log('Not found');
  }
};
