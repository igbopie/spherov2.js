import { CommandWithRaw } from "./types";
export declare function factory(callback: (err: string, response?: CommandWithRaw) => void): {
    add(byte: number): number | void;
};
