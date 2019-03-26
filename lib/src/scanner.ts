import { IToyDiscovered } from './scanner';
import { Peripheral } from 'noble';
import { IToyAdvertisement, ServicesUUID } from './toys/types';
import { wait } from './utils';
import { Core } from './toys/core';
import { BB9E } from './toys/bb9e';
import { R2D2 } from './toys/r2d2';
import { R2Q5 } from './toys/r2q5';
import { LightningMcQueen } from './toys/lightning-mcqueen';
import { SpheroMini } from './toys/sphero-mini';
import noble from './noble-wrapper';

export interface IToyDiscovered extends IToyAdvertisement {
  peripheral: Peripheral;
}

const discover = async (
  validToys: IToyAdvertisement[],
  toys: IToyDiscovered[],
  p: Peripheral
) => {
  const { advertisement, uuid } = p;
  const { localName = '' } = advertisement;
  console.log('discovered', p);
  validToys.forEach(async toyAdvertisement => {
    if (localName.indexOf(toyAdvertisement.prefix) === 0) {
      toys.push({
        ...toyAdvertisement,
        peripheral: p
      });
      // tslint:disable-next-line:no-console
      console.log(
        `name: ${toyAdvertisement.name}, uuid: ${uuid}, mac-address: ${
          p.address
        }`
      );
    }
  });
};

/**
 * Searches (but does not start) toys that matcht the passed criteria
 */
export const findToys = async (toysType: IToyAdvertisement[]) => {
  const toys: IToyDiscovered[] = [];
  // tslint:disable-next-line:no-console
  console.log('Scanning devices...');
  const discoverBinded = discover.bind(this, toysType, toys);

  noble.on('discover', discoverBinded);
  noble.startScanning(Object.keys(ServicesUUID).map(key => ServicesUUID[key])); // any service UUID, no duplicates
  await wait(5000);
  noble.stopScanning();
  noble.removeListener('discover', discoverBinded);

  // tslint:disable-next-line:no-console
  console.log('Done scanning devices.');
  return toys;
};

const startToy = async (toy: Core) => {
  // tslint:disable-next-line:no-console
  console.log('Starting...');
  await toy.start();

  // // tslint:disable-next-line:no-console
  console.log('Started');
  // const version = await toy.appVersion();

  // // tslint:disable-next-line:no-console
  // console.log('Version', version);
  // const battery = await toy.batteryVoltage();

  // // tslint:disable-next-line:no-console
  // console.log('Battery', battery);
};

/**
 * Searches toys that match the passed criteria, starts the first found toy and returns it
 */
export const find = async <T extends Core>(
  toyType: IToyAdvertisement,
  name?: string
) => {
  const discovered = await findToys([toyType]);
  const discoveredItem: IToyDiscovered =
    discovered.find(item => item.peripheral.advertisement.localName === name) ||
    discovered[0];

  if (!discoveredItem) {
    // tslint:disable-next-line:no-console
    return console.log('Not found');
  }

  const toy: Core = new toyType.class(discoveredItem.peripheral);

  await startToy(toy);

  return toy as T;
};

/**
 * Searches toys that match the passed criteria, starts and returns them
 */
export const findAll = async (toyType: IToyAdvertisement) => {
  const discovered = await findToys([toyType]);
  if (discovered.length > 0) {
    // Init toys and return array
    return await discovered.reduce(async (promise: Promise<Core[]>, item) => {
      const toyArray = await promise;
      const toy: Core = new toyType.class(item.peripheral);
      await startToy(toy);
      return [...toyArray, toy];
    }, Promise.resolve([]));
  } else {
    // tslint:disable-next-line:no-console
    console.log('Not found');
  }
};

/**
 * Searches BB9E toys, starts the first one that was found and returns it
 */
export const findBB9E = async () => {
  return (await find(BB9E.advertisement)) as BB9E;
};

/**
 * Searches R2D2 toys, starts the first one that was found and returns it
 */
export const findR2D2 = async () => {
  return (await find(R2D2.advertisement)) as R2D2;
};

/**
 * Searches R2Q5 toys, starts the first one that was found and returns it
 */
export const findR2Q5 = async () => {
  return (await find(R2Q5.advertisement)) as R2Q5;
};

/**
 * Searches Sphero Mini toys, starts the first one that was found and returns it
 */
export const findSpheroMini = async () => {
  return (await find(SpheroMini.advertisement)) as SpheroMini;
};

/**
 * Searches a Sphero Mini toy with the passed name, starts and returns it
 */
export const findSpheroMiniByName = async (name: string) => {
  return (await find(SpheroMini.advertisement, name)) as SpheroMini;
};

/**
 * Searches for all available Sphero Mini toys, starts and returns them
 */
export const findAllSpheroMini = async () => {
  return (await findAll(SpheroMini.advertisement)) as SpheroMini[];
};

/**
 * Searches Lightning McQueen toys, starts the first one that was found and returns it
 */
export const findLightningMcQueen = async () => {
  return (await find(LightningMcQueen.advertisement)) as LightningMcQueen;
};
