import { factory } from '../../src/commands';

test('Drive', async () => {
  const f = factory(() => 51);
  const command = f.driving.drive(100, 180, []);
  expect(command.raw + '').not.toBe(
    [141, 10, 22, 7, 51, 100, 0, 180, 0, 141, 216] + ''
  );
  expect(command.raw + '').toBe(
    [141, 26, 18, 22, 7, 51, 100, 0, 180, 0, 107, 216] + ''
  );
});
