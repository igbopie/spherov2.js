import { SpheroMini } from '../toys/sphero-mini';
import { wait } from '../utils';
import { findSpheroMini } from './lib/scanner';
import { findToys } from './lib/scanner';

import { Core } from '../../toys/core';
import { Peripheral } from 'noble';
import * as noble from 'noble';

import { IToyAdvertisement } from '../../toys/types';

const WAIT_TIME: number = 100;

export const ensemble = async (minis: SpheroMini[]) => {
  var i=0;
  // Cycle 10 times. On each cycle set each bot to white, green, then red.
  while (i < 10) {
    // set each mini's color to white
    for (let mini of minis) {
      await mini.setMainLedColor(0xFF, 0xFF, 0xFF);
      await wait(WAIT_TIME);
    }
    // set each mini's color to green
    for (let mini of minis) {
      await mini.setMainLedColor(0, 0xFF, 0);
      await wait(WAIT_TIME);
    }
    // set each mini's color to red
    for (let mini of minis) {
      await mini.setMainLedColor(0xFF, 0, 0);
      await wait(WAIT_TIME);
    }
    i++;
  }

  // Put each mini to sleep
  for (let mini of minis) {
    await mini.sleep();
  }
  process.exit();
};

const main = async () => {
  // Find all bots that advertise as a Sphero Mini
  const bots = await findToys([SpheroMini.advertisement]);

  // sort the minis by their bluetooth advertisment local name (e.g, "SM-????")
  bots.sort((a, b): number => {
    if (a.peripheral.advertisement.localName < b.peripheral.advertisement.localName)
      return -1;
    if (a.peripheral.advertisement.localName > b.peripheral.advertisement.localName)
      return 1;
    return 0;
  });

  // start each bot, cast it to a SpheroMini object, then add to an array
  let minis = [];
  for(let bot of bots) {
    console.log("Starting: " + bot.peripheral.advertisement.localName);
    // cast bot to a Core object
    const toy: Core = new SpheroMini.advertisement.class(bot.peripheral);
    await toy.start();
    await toy.wake();
    // cast Core toy to a SpheroMini
    const mini: SpheroMini = toy as SpheroMini;
    minis.push(mini);
  }

  // run the ensemble action on the array of minis
  ensemble(minis);
};


main();
