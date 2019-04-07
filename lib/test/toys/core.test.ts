import { Core } from '../../src/toys/core';
import PeripheralMock from '../ble-mock/peripheral-mock';
import { Peripheral } from 'noble';

test('Toy', async () => {
  // @ts-ignore
  const peripheral: Peripheral = new PeripheralMock();
  const toy = new Core(peripheral);
  await toy.start();
  expect(true).toBeTruthy();
});
