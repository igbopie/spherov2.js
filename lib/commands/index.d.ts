import { ICommandWithRaw, DriveFlag } from './types';
import { Stance } from '../toys/types';
export interface IReExport {
    a: DriveFlag;
    b: Stance;
}
export declare const factory: (seq?: () => number) => {
    api: {
        echo: () => ICommandWithRaw;
    };
    driving: {
        drive: (speed: number, heading: number, flags: DriveFlag[]) => ICommandWithRaw;
        driveAsRc: (heading: number, speed: number) => ICommandWithRaw;
    };
    power: {
        batteryVoltage: () => ICommandWithRaw;
        sleep: () => ICommandWithRaw;
        something2: () => ICommandWithRaw;
        something3: () => ICommandWithRaw;
        something4: () => ICommandWithRaw;
        wake: () => ICommandWithRaw;
    };
    somethingApi: {
        something5: () => ICommandWithRaw;
    };
    systemInfo: {
        appVersion: () => ICommandWithRaw;
        something: () => ICommandWithRaw;
        something6: () => ICommandWithRaw;
        something7: () => ICommandWithRaw;
    };
    userIo: {
        allLEDsRaw: (payload: number[]) => ICommandWithRaw;
        setBackLedIntensity: (i: number) => ICommandWithRaw;
        setMainLedBlueIntensity: (b: number) => ICommandWithRaw;
        setMainLedColor: (r: number, g: number, b: number) => ICommandWithRaw;
        setMainLedGreenIntensity: (g: number) => ICommandWithRaw;
        setMainLedRedIntensity: (r: number) => ICommandWithRaw;
        playAudioFile: (idx: number) => ICommandWithRaw;
        turnDome: (angle: Uint8Array) => ICommandWithRaw;
        setStance: (stance: Stance) => ICommandWithRaw;
        playAnimation: (animation: number) => ICommandWithRaw;
    };
    sensor: {
        enableCollisionAsync: () => ICommandWithRaw;
        configureCollision: (xThreshold: number, yThreshold: number, xSpeed: number, ySpeed: number, deadTime: number, method?: number) => ICommandWithRaw;
        sensorMask: (payload: number[]) => ICommandWithRaw;
        sensor1: () => ICommandWithRaw;
        sensor2: () => ICommandWithRaw;
        configureSensorStream: () => ICommandWithRaw;
    };
};
