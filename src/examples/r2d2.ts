import {Stance} from '../toys/r2d2';
import {wait} from '../utils';
import {findR2D2} from './lib/scanner';

const WAIT_TIME: number = 1000;

const main = async () => {
    const r2d2 = await findR2D2();
    if (r2d2) {
        await r2d2.wake();
        await r2d2.turnDome(90);
        await wait(WAIT_TIME);
        await r2d2.turnDome(-90);
        await wait(WAIT_TIME);
        await r2d2.playAnimation(2);
        await wait(5 * WAIT_TIME);
        await r2d2.setStance(Stance.tripod);
        await wait(5 * WAIT_TIME);
        await r2d2.playAudioFile(3);
        await r2d2.setStance(Stance.bipod);
        await wait(5 * WAIT_TIME);
        await r2d2.playAnimation(5);
        await r2d2.sleep();
    }
};

main();
