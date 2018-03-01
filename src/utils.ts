export const toPromise = (fn: Function, args?: Array<any>) => {
  return new Promise((resolve, reject)=> {
    const safeArgs = args || [];
    fn( ...safeArgs, (err: Error, ...retArgs: Array<any>) => {
      if (err) {
        reject(err);
      } else {
        resolve(retArgs);
      }
    });
  });
};

export const wait = (time: number) => new Promise(callback => setTimeout(callback, time));

export const combineFlags = (flags: Array<number>) => flags.reduce((memo, flag) => memo | flag, 0);