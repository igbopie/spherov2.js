import { SensorMaskValues, SensorMaskV2 } from './types';

export const sensorValuesToRaw = (
  sensorMask: SensorMaskValues[]
): SensorMaskV2[] =>
  sensorMask.map(m => {
    let mask: SensorMaskV2;
    switch (m) {
      case SensorMaskValues.accelerometer:
        mask = SensorMaskV2.accelerometerFilteredAll;
        break;
      case SensorMaskValues.locator:
        mask = SensorMaskV2.locatorAll;
        break;
      case SensorMaskValues.orientation:
        mask = SensorMaskV2.imuAnglesFilteredAll;
        break;
    }
    return mask;
  }, []);

export const flatSensorMask = (sensorMask: SensorMaskV2[]): number =>
  sensorMask.reduce((bits, m) => {
    return (bits |= m); // tslint:disable-line:no-bitwise
  }, 0);

export const convertBinaryToFloat = (
  nums: number[],
  offset: number
): number => {
  // Extract binary data from payload array at the specific position in the array
  // Position in array is defined by offset variable
  // 1 Float value is always 4 bytes!
  if (offset + 4 > nums.length) {
    // tslint:disable-next-line:no-console
    console.log('offset exceeded Limit of array ' + nums.length);
    return 0;
  }

  // convert it to a unsigned 8 bit array (there might be a better way)
  const ui8 = new Uint8Array([
    nums[0 + offset],
    nums[1 + offset],
    nums[2 + offset],
    nums[3 + offset]
  ]); // [0, 0, 0, 0]
  // set the uInt8 Array as source for data view
  const view = new DataView(ui8.buffer);

  // return the float value as function of dataView class
  return view.getFloat32(0);
};

export const parseSensorEvent = (
  payload: number[],
  sensorMask: SensorMaskV2[]
): any => {
  let location = 0;
  const response: any = {};

  if (sensorMask.indexOf(SensorMaskV2.imuAnglesFilteredAll) >= 0) {
    let yaw: number;
    let pitch: number;
    let roll: number;

    pitch = convertBinaryToFloat(payload, location);
    location += 4;

    roll = convertBinaryToFloat(payload, location);
    location += 4;

    yaw = convertBinaryToFloat(payload, location);
    location += 4;
    response.angles = {
      pitch,
      roll,
      yaw
    };
  }

  if (sensorMask.indexOf(SensorMaskV2.accelerometerFilteredAll) >= 0) {
    let filteredX: number;
    let filteredY: number;
    let filteredZ: number;

    filteredX = convertBinaryToFloat(payload, location);
    location += 4;

    filteredY = convertBinaryToFloat(payload, location);
    location += 4;

    filteredZ = convertBinaryToFloat(payload, location);
    location += 4;

    response.accelerometer = {
      filtered: {
        x: filteredX,
        y: filteredY,
        z: filteredZ
      }
    };
  }

  if (sensorMask.indexOf(SensorMaskV2.accelerometerFilteredAll) >= 0) {
    let filteredX: number;
    let filteredY: number;
    let filteredZ: number;

    filteredX = convertBinaryToFloat(payload, location);
    location += 4;

    filteredY = convertBinaryToFloat(payload, location);
    location += 4;

    filteredZ = convertBinaryToFloat(payload, location);
    location += 4;

    response.accelerometer = {
      filtered: {
        x: filteredX,
        y: filteredY,
        z: filteredZ
      }
    };
  }

  if (sensorMask.indexOf(SensorMaskV2.locatorAll) >= 0) {
    let positionX: number;
    let positionY: number;
    let velocityX: number;
    let velocityY: number;
    const metersToCentimeters = 100.0;

    positionX = convertBinaryToFloat(payload, location) * metersToCentimeters;
    location += 4;

    positionY = convertBinaryToFloat(payload, location) * metersToCentimeters;
    location += 4;

    velocityX = convertBinaryToFloat(payload, location) * metersToCentimeters;
    location += 4;

    velocityY = convertBinaryToFloat(payload, location) * metersToCentimeters;
    location += 4;

    response.locator = {
      position: {
        x: positionX,
        y: positionY
      },
      velocity: {
        x: velocityX,
        y: velocityY
      }
    };
  }
  return response;
};
