import PeripheralMock from "./peripheral-mock";
import { Toy } from "../src/toy";

test('Toy', async () => {
  const peripheral = new PeripheralMock();
  const toy = new Toy(peripheral);
  await toy.start();
  expect(true).toBeTruthy();
});