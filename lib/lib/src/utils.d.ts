/**
 * Wraps the passed function into a promise
 */
export declare const toPromise: (fn: (...args: any[]) => void, args?: any[]) => Promise<{}>;
/**
 * Waits the given amount of milliseconds
 * @return promise
 */
export declare const wait: (time: number) => Promise<{}>;
export declare const combineFlags: (flags: number[]) => number;
