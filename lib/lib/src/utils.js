"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.wait = (time) => new Promise((callback) => setTimeout(callback, time));
// tslint:disable-next-line:no-bitwise
exports.combineFlags = (flags) => flags.reduce((memo, flag) => memo | flag, 0);
