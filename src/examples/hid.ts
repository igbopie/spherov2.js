import nimbus, { IControllerState } from './lib/nimbus';
import { SpheroMini } from '../toys/sphero-mini';
import { wait } from '../utils';

let state: IControllerState;
nimbus.onChanged((_state) => {
  state = _state;
});

// SORRY FOR THIS CODE, It is my playground for now
export default (toy: SpheroMini) => {
  let calibrating = false;
  let offset = 0;

  const loop = async () => {
    while (true) {
      if (state) {
        const heading = state.leftStick.angle;
        const currentSpeed = state.leftStick.module * 255;
        if (state.rightStick.angle >= 0) {
          toy.setBackLedIntensity(255);
          offset = state.rightStick.angle;
          calibrating = true;
        } else {
          toy.setBackLedIntensity(0);
          calibrating = false;
        }
        toy.roll(currentSpeed, calibrating ? offset : (heading + offset) % 360, []);
      }
      await wait(80);
    }
  };

  loop();
};
