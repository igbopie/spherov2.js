import { Scanner, SpheroMini, Utils } from 'spherov2.js';
import { Toys } from 'spherov2.js';
import { starter } from './utils/starter';

// SORRY FOR THIS CODE, It is my playground for now
const cmdPlay = (toy: SpheroMini) => {
  let pressTimeout: NodeJS.Timer;
  let heading = 0;
  let currentSpeed = 0;
  let speed = 150;
  let executing = true;
  let calibrating = false;
  let offset = 0;

  const cancelPress = () => {
    clearTimeout(pressTimeout);
    pressTimeout = null;
  };

  const addTimeout = () => {
    pressTimeout = setTimeout(() => {
      currentSpeed = 0;
    }, 500);
  };

  const loop = async () => {
    while (true) {
      if (executing) {
        toy.roll(
          currentSpeed,
          calibrating ? heading : (heading + offset) % 360,
          []
        );
      }
      if (currentSpeed === 0 && !calibrating) {
        executing = false;
      }
      if (calibrating) {
        heading += 5;

        if (heading > 360) {
          heading = 0;
        }
      }
      await Utils.wait(100);
    }
  };

  const handle = async (key: string = '', symbol: any = {}) => {
    cancelPress();
    if (symbol.name === 'up') {
      heading = 0;
      currentSpeed = speed;
      executing = true;
      addTimeout();
    } else if (symbol.name === 'left') {
      heading = 270;
      currentSpeed = speed;
      executing = true;
      addTimeout();
    } else if (symbol.name === 'right') {
      heading = 90;
      currentSpeed = speed;
      executing = true;
      addTimeout();
    } else if (symbol.name === 'down') {
      heading = 180;
      currentSpeed = speed;
      executing = true;
      addTimeout();
    }

    if (key === 'q') {
      speed += 10;
      // console.log('speed', speed);
    } else if (key === 'z') {
      speed -= 10;
      // console.log('speed', speed);
    } else if (key === 'p') {
      process.exit();
    } else if (key === 's') {
      toy.sleep();
    } else if (key === 'a') {
      toy.wake();
    } else if (key === 'c') {
      if (calibrating) {
        calibrating = false;
        await toy.setBackLedIntensity(0);
        offset = heading;
        heading = 0;
      } else {
        await toy.setBackLedIntensity(255);
        currentSpeed = 0;
        executing = true;
        heading = 0;
        calibrating = true;
      }
    }
  };

  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', handle);

  loop();
};

starter(cmdPlay);
