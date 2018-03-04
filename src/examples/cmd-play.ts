import { Toy } from "../toy";


export default (toy: Toy) => {

  let pressTimeout: NodeJS.Timer;
  const cancelPress = () => {
    clearTimeout(pressTimeout);
    pressTimeout = null;
  }
  const addTimeout = () => {
    pressTimeout = setTimeout(() => handle(), 50);
  }
  const handle = (key: string = '', symbol: any = {}) => {
    cancelPress();
    if (symbol.name === 'up') {
      heading = 0;
      toy.roll(speed, heading, [])
      // addTimeout();
    } else if (symbol.name === 'left') {
      heading = 270;
      toy.roll(speed, heading, [])
      // addTimeout();
    } else if (symbol.name === 'right') {
      heading = 90;
      toy.roll(speed, heading, [])
      // addTimeout();
    } else if (symbol.name === 'down') {
      heading = 180;
      toy.roll(speed, heading, [])
      //addTimeout();
    } else {
      console.log('STOP');
      toy.roll(0, heading, [])
    }


    if (key === 'q') {
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

    console.log(symbol.name, speed, heading);
  };

  const readline = require('readline');
  let heading = 0;
  let speed = 150;

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);


  process.stdin.on('keypress', handle);
};
