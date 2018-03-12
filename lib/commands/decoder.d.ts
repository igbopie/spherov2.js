import { ICommandWithRaw } from './types';
export declare function number(buffer: number[], offset: number): number;
export declare function factory(callback: (err: string, response?: ICommandWithRaw) => void): {
    add(byte: number): number | void;
};
