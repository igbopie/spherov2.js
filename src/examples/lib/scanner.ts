import { IToyDiscovered } from './scanner';
import { Peripheral } from 'noble';
import { ICharacteristic, IPeripheral } from '../../ble';
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
      console.log(`Detected ${toyAdvertisement.name} (${toyAdvertisement.prefix}): ${uuid}`);
      toys.push({
        ...toyAdvertisement,
        peripheral: p,
      });
      // tslint:disable-next-line:no-console
      console.log(`name: ${toyAdvertisement.name}, address: ${p.address}`);
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

function dec2bin(dec: number) {
  return (dec >>> 0).toString(2);
}

function dec2FullBin(dec: number) {
  const str: string = (dec >>> 0).toString(2);
  return '00000000'.substr(str.length) + str;
}

function byteArray(nums: number[]) {
  let returnVal = '';
  for (const item of nums) {
    returnVal += dec2FullBin(item);
  }
}


export const find = async (toyType: IToyAdvertisement, name: string) => {

  const pattern: number = 0b01;
  
  // tslint:disable-next-line:no-console
  console.log(dec2FullBin(pattern));
  
  const discovered = await findToys([toyType]);
  if (discovered.length > 0) {

    let discoveredItem: IToyDiscovered = null;
    if (name != null) {
      for (const item of discovered) {
        if (item.peripheral.advertisement.localName === name) {
          discoveredItem = item;
          break;
        }
      }
    } else {
      discoveredItem = discovered[0];
    }

    if (discoveredItem == null) {
       // tslint:disable-next-line:no-console
      console.log('Not found');
      return;
    }

    // tslint:disable-next-line:no-console
    console.log(discoveredItem); // 0,1,2

    const toy: Core = new toyType.class(discoveredItem.peripheral);

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

    return toy;
  } else {

    // tslint:disable-next-line:no-console
    console.log('Not found');
  }
};

export const findAll = async (toyType: IToyAdvertisement) => {
  const discovered = await findToys([toyType]);
  if (discovered.length > 0) {
    const toyArray: Core[] = [];
    for (const item of discovered) {
      // tslint:disable-next-line:no-console
      console.log(item); // 0,1,2

      const toy: Core = new toyType.class(item.peripheral);
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
    }
    return toyArray;
  } else {

    // tslint:disable-next-line:no-console
    console.log('Not found');
  }
};

export const findBB9E = async () => {
  return await find(BB9E.advertisement, null) as BB9E;
};

export const findSpheroMini = async () => {
  return await find(SpheroMini.advertisement, null) as SpheroMini;
};

export const findSpheroMiniByName = async (name: string) => {
  return await find(SpheroMini.advertisement, name) as SpheroMini;
};

export const findAllSpheroMini = async () => {
  return await findAll(SpheroMini.advertisement) as SpheroMini[];
};

export const findLightningMcQueen = async () => {
  return await find(LightningMcQueen.advertisement, null) as LightningMcQueen;
};
