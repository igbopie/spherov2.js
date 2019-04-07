/**
 * Wraps the passed function into a promise
 */
export const toPromise = (
  binding: any,
  fn: (...args: any[]) => void,
  args?: any[]
) => {
  return new Promise((resolve, reject) => {
    const safeArgs = args || [];
    fn.bind(binding)(...safeArgs, (err: Error, ...retArgs: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(...retArgs);
      }
    });
  });
};

/**
 * Waits the given amount of milliseconds
 * @return promise
 */
export const wait = (time: number) =>
  new Promise(callback => setTimeout(callback, time));

export const combineFlags = (flags: number[]) =>
  // tslint:disable-next-line:no-bitwise
  flags.reduce((memo, flag) => memo | flag, 0);
