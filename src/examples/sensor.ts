
import { findSpheroMini } from './lib/scanner';
import { wait } from '../utils';
import { Event } from '../toys/core';
import { ICommandWithRaw } from '../commands/types';

const main = async () => {
  const sphero = await findSpheroMini();
  if (sphero) {

    await sphero.configureSensorStream();
    sphero.on(Event.onSensor, (command: ICommandWithRaw) => {
      const line = command.payload.map((i: number) => `${i}`.padStart(3, '0')).join(' ');
      // tslint:disable-next-line:no-console
      console.log('Sensor Read', line);
    });

    while (true) {
      await wait(1000);
    }
  }
};

main();
