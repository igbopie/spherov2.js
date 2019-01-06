import { Core } from '../../src/toys/core';
import PeripheralMock from '../ble-mock/peripheral-mock';

test('Toy', async () => {
  const peripheral = new PeripheralMock();
  const toy = new Core(peripheral);
  await toy.start();
  expect(true).toBeTruthy();
});
