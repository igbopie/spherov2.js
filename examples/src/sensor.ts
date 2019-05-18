import { Event, Utils, ICommandWithRaw, RollableToy } from 'spherov2.js';
import { starter } from './utils/starter';

const main = async (sphero: RollableToy) => {
  await sphero.configureSensorStream();
  // await sphero.enableCollisionDetection();

  console.log('Sensor enabled');

  // sphero.on(Event.onCollision, (command: ICommandWithRaw) => {
  //   // tslint:disable-next-line:no-console
  //   console.log('Sensor Read', command);
  // });

  sphero.on(Event.onSensor, (command: ICommandWithRaw) => {
    console.log('onSensor', command);
  });

  while (true) {
    await Utils.wait(1000);
  }
};

starter(main);
