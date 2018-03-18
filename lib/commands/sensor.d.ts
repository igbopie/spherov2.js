import { CommandGenerator, ICommandWithRaw } from './types';
declare const _default: (generator: CommandGenerator) => {
    enableCollisionAsync: () => ICommandWithRaw;
    configureCollision: (xThreshold: number, yThreshold: number, xSpeed: number, ySpeed: number, deadTime: number, method?: number) => ICommandWithRaw;
};
export default _default;
