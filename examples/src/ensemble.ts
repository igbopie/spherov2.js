import { Scanner, Core, SpheroMini, Utils } from 'spherov2.js';

const WAIT_TIME: number = 100;

export const setEachMiniColor = async (minis: SpheroMini[], r: number, g: number, b: number) => {
  for (const mini of minis) {
    await mini.setMainLedColor(r, g, b);
    await Utils.wait(WAIT_TIME);
  }
};

export const ensemble = async (minis: SpheroMini[]) => {
  // Cycle 10 times. On each cycle set each bot to white, green, then red.
  for (let i = 0; i < 10; i++) {
    // set each mini's color to white
    await setEachMiniColor(minis, 0xFF, 0xFF, 0xFF);

    // set each mini's color to green
    await setEachMiniColor(minis, 0, 0xFF, 0);

    // set each mini's color to red
    await setEachMiniColor(minis, 0xFF, 0, 0);
  }

  // Put each mini to sleep
  for (const mini of minis) {
    await mini.sleep();
  }
  process.exit();
};

const main = async () => {
  // Find all bots that advertise as a Sphero Mini
  const bots = await Scanner.findToys([SpheroMini.advertisement]);

  // sort the minis by their bluetooth advertisment local name (e.g, "SM-????")
  bots.sort((a, b): number => {
    if (a.peripheral.advertisement.localName < b.peripheral.advertisement.localName) {
      return -1;
    } else if (a.peripheral.advertisement.localName > b.peripheral.advertisement.localName) {
      return 1;
    }
    return 0;
  });

  // start each bot, cast it to a SpheroMini object, then add to an array
  const minis = [];
  for (const bot of bots) {
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
