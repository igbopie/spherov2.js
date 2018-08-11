import { Peripheral } from 'noble';
import * as noble from 'noble';
import { IToyAdvertisement } from '../../toys/types';
import { wait } from '../../utils';
import { Core } from '../../toys/core';
import { BB9E } from '../../toys/bb9e';
import { LightningMcQueen } from '../../toys/lightning-mcqueen';
import { SpheroMini } from '../../toys/sphero-mini';

export interface IToyDiscovered extends IToyAdvertisement {
  peripheral: Peripheral;
}

// const validToys: IToyAdvertisement[] = [
//   SpheroMini.advertisement,
//   // {
//   //   prefix: 'LM-',
//   //   name: 'Lightning McQueen'
//   // },
// ];

const discover = async (
    validToys: IToyAdvertisement[],
    toys: IToyDiscovered[],
    p: Peripheral) => {
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

export const findToys = async (toysType: IToyAdvertisement[]) => {
  const toys: IToyDiscovered[] = [];
  // tslint:disable-next-line:no-console
  console.log('Scanning devices...');
  const discoverBinded = discover.bind(this, toysType, toys);

  noble.on('discover', discoverBinded);
  noble.startScanning(); // any service UUID, no duplicates
  await wait(5000);
  noble.stopScanning();
  noble.removeListener('discover', discoverBinded);

  // tslint:disable-next-line:no-console
  console.log('Done scanning devices.');
  return toys;
};

export const find = async (toyType: IToyAdvertisement) => {
  const discovered = await findToys([toyType]);
  if (discovered.length > 0) {
    const toy: Core = new toyType.class(discovered[0].peripheral);

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

export const findBB9E = async () => {
  return await find(BB9E.advertisement) as BB9E;
};

export const findSpheroMini = async () => {
  return await find(SpheroMini.advertisement) as SpheroMini;
};

export const findLightningMcQueen = async () => {
  return await find(LightningMcQueen.advertisement) as LightningMcQueen;
};
