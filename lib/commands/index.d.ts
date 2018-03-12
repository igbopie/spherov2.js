import { DriveFlag, ICommandWithRaw } from './types';
export declare const factory: (seq?: () => number) => {
    api: {
        echo: () => ICommandWithRaw;
    };
    driving: {
        drive: (speed: number, heading: number, flags: DriveFlag[]) => ICommandWithRaw;
    };
    power: {
        batteryVoltage: () => ICommandWithRaw;
        sleep: () => ICommandWithRaw;
        wake: () => ICommandWithRaw;
    };
    systemInfo: {
        appVersion: () => ICommandWithRaw;
    };
};
