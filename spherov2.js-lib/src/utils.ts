export const toPromise = (fn: (...args: any[]) => void, args?: any[]) => {
  return new Promise((resolve, reject) => {
    const safeArgs = args || [];
    fn( ...safeArgs, (err: Error, ...retArgs: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(...retArgs);
      }
    });
  });
};

export const wait = (time: number) => new Promise((callback) => setTimeout(callback, time));

// tslint:disable-next-line:no-bitwise
export const combineFlags = (flags: number[]) => flags.reduce((memo, flag) => memo | flag, 0);
