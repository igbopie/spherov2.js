import debug from 'debug';
import { Peripheral } from 'noble';
import noble from './noble-wrapper';
import { IToyDiscovered } from './scanner';
import { BB9E } from './toys/bb9e';
import { Core } from './toys/core';
import { LightningMcQueen } from './toys/lightning-mcqueen';
import { R2D2 } from './toys/r2d2';
import { R2Q5 } from './toys/r2q5';
import { SpheroMini } from './toys/sphero-mini';
import { IToyAdvertisement, ServicesUUID } from './toys/types';
import { wait } from './utils';
import { toPromise } from './utils';

const scannerDebug = debug('spherov2-scanner');

export interface IToyDiscovered extends IToyAdvertisement {
  peripheral: Peripheral;
}

const discover = async (
  validToys: IToyAdvertisement[],
  toys: IToyDiscovered[],
  p: Peripheral
) => {
  scannerDebug('Dicovered', p.address);
  const { advertisement, uuid } = p;
  const { localName = '' } = advertisement;
  validToys.forEach(async toyAdvertisement => {
    if (localName.indexOf(toyAdvertisement.prefix) === 0) {
      toys.push({ ...toyAdvertisement, peripheral: p });
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
  scannerDebug('findToys');
  const toys: IToyDiscovered[] = [];
  // tslint:disable-next-line:no-console
  console.log('Scanning devices...');
  const discoverBinded = discover.bind(this, toysType, toys);

  // @ts-ignore
  noble.on('discover', discoverBinded);
  scannerDebug('findToys-nobleStartScanning');
  await toPromise(noble, noble.startScanning, [
    Object.keys(ServicesUUID).map(key => ServicesUUID[key]),
    false
  ]); // any service UUID, no duplicates
  scannerDebug('findToys-wait5seconds');
  await wait(5000);
  await toPromise(noble, noble.stopScanning);

  // @ts-ignore
  noble.removeListener('discover', discoverBinded);

  // tslint:disable-next-line:no-console
  console.log('Done scanning devices.');
  return toys;
};

const startToy = async (toy: Core) => {
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
  console.log('Battery', battery);
};

/**
 * Searches toys that match the passed criteria, starts the first found toy and
 * returns it
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
 * Searches Lightning McQueen toys, starts the first one that was found and
 * returns it
 */
export const findLightningMcQueen = async () => {
  return (await find(LightningMcQueen.advertisement)) as LightningMcQueen;
};
