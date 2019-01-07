import nimbus, { IControllerState } from './nimbus';
import { SpheroMini, Utils } from 'spherov2.js';

let state: IControllerState;
nimbus.onChanged((_state) => {
  state = _state;
});

// SORRY FOR THIS CODE, It is my playground for now
export const hid = async (toy: SpheroMini) => {
  let calibrating = false;
  let offset = 0;
  let stopped = false;
  let heading: number;

  const loop = async () => {
    while (true) {
      if (state) {
        const { angle, module } = state.leftStick;
        const currentSpeed = module * 255;
        heading = isNaN(angle) ? heading : angle;

        if (state.rightStick.angle >= 0 && state.rightStick.module > 0.8) {
          toy.setBackLedIntensity(255);
          offset = state.rightStick.angle;
          calibrating = true;
        } else if (calibrating) {
          toy.setBackLedIntensity(0);
          calibrating = false;
        }
        if (currentSpeed > 0) {
          stopped = false;
        }
        if (!stopped || calibrating) {
          toy.roll(calibrating ?  0 : currentSpeed, calibrating ? offset : (heading + offset) % 360, []);

          if (currentSpeed === 0) {
            stopped = true;
          }
        }
      }
      await Utils.wait(80);
    }
  };

  await loop();
};
