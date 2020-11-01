import { Core } from '../../src/toys/core';
import PeripheralMock from '../ble-mock/peripheral-mock';
import { Peripheral } from '@abandonware/noble';

test('Toy', async () => {
  const peripheral: Peripheral = (new PeripheralMock() as unknown) as Peripheral;
  const toy = new Core(peripheral);
  await toy.start();
  expect(true).toBeTruthy();
});
