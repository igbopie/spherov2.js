import { DriveFlag, ICommandWithRaw } from './types';
export declare const factory: () => {
    api: {
        echo: () => ICommandWithRaw;
    };
    driving: {
        drive: (speed: number, heading: number, flags: DriveFlag[]) => ICommandWithRaw;
    };
    power: {
        sleep: () => ICommandWithRaw;
        wake: () => ICommandWithRaw;
    };
    systemInfo: {
        appVersion: () => ICommandWithRaw;
    };
};
