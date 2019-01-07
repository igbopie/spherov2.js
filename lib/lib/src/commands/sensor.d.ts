import { CommandGenerator, ICommandWithRaw } from './types';
declare const _default: (generator: CommandGenerator) => {
    enableCollisionAsync: () => ICommandWithRaw;
    configureCollision: (xThreshold: number, yThreshold: number, xSpeed: number, ySpeed: number, deadTime: number, method?: number) => ICommandWithRaw;
    sensorMask: (payload: number[]) => ICommandWithRaw;
    sensor1: () => ICommandWithRaw;
    sensor2: () => ICommandWithRaw;
    configureSensorStream: () => ICommandWithRaw;
};
export default _default;
