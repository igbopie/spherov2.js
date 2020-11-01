import { parseSensorEvent, sensorValuesToRaw } from '../../src/toys/utils';
import payload from './sensor-payload';
import { SensorMaskValues } from '../../src/toys/types';

test('Sensor-Parse', async () => {
  const mask = sensorValuesToRaw([
    SensorMaskValues.accelerometer,
    SensorMaskValues.orientation,
    SensorMaskValues.locator,
  ]);
  const output = parseSensorEvent(payload, mask);
  expect(output).toEqual({
    angles: {
      pitch: 5.656248092651367,
      roll: -0.11342836171388626,
      yaw: 0.0003869668871629983,
    },
    accelerometer: {
      filtered: {
        x: -0.006151249632239342,
        y: -0.10022957623004913,
        z: 1.0062620639801025,
      },
    },
    locator: {
      position: { x: -0.000015292712873815617, y: -0.0002353802983634523 },
      velocity: { x: -0.0003802337232627906, y: -0.00783980285632424 },
    },
  });
});
