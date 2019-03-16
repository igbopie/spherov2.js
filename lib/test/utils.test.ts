import { combineFlags, toPromise } from '../src/utils';

test('Combine flags', () => {
  expect(combineFlags([1, 2])).toBe(3);
});

test('toPromise', async () => {
  expect.assertions(2);

  let returnError = false;
  const mockFn = (callback: (err?: string, n?: number) => void) => {
    if (returnError) {
      callback('Some error');
    }
    return callback(undefined, 4);
  };

  expect(await toPromise({}, mockFn)).toBe(4);

  returnError = true;

  try {
    await toPromise({}, mockFn);
    expect('').toBe('Should not run this');
  } catch (e) {
    expect(e).toBe('Some error');
  }
});
