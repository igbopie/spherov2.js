"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wraps the passed function into a promise
 */
exports.toPromise = (fn, args) => {
    return new Promise((resolve, reject) => {
        const safeArgs = args || [];
        fn(...safeArgs, (err, ...retArgs) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(...retArgs);
            }
        });
    });
};
/**
 * Waits the given amount of milliseconds
 * @return promise
 */
exports.wait = (time) => new Promise((callback) => setTimeout(callback, time));
// tslint:disable-next-line:no-bitwise
exports.combineFlags = (flags) => flags.reduce((memo, flag) => memo | flag, 0);
