import {
  SensorMaskValues,
  SensorMaskV2,
  APIVersion,
  ISensorMaskRaw
} from './types';
import { ISensorResponse } from '../commands/types';

export const sensorValuesToRaw = (
  sensorMask: SensorMaskValues[],
  apiVersion: APIVersion = APIVersion.V2
): ISensorMaskRaw => {
  return {
    v2: sensorMask.reduce((v2, m) => {
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

      if (m === SensorMaskValues.gyro && apiVersion === APIVersion.V2) {
        mask = SensorMaskV2.gyroFilteredAllV2;
      }

      if (mask) {
        return [...v2, mask];
      }
      return v2;
    }, []),
    v21: sensorMask.reduce((v21, m) => {
      let mask: SensorMaskV2;
      if (m === SensorMaskValues.gyro && apiVersion === APIVersion.V21) {
        mask = SensorMaskV2.gyroFilteredAllV21;
      }
      if (mask) {
        return [...v21, mask];
      }
      return v21;
    }, [])
  };
};

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

interface IParserState {
  location: number;
  response: ISensorResponse;
  payload: number[];
  sensorMask: ISensorMaskRaw;
}

const fillAngles = (state: IParserState): IParserState => {
  const { sensorMask, payload, response } = state;
  let { location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.imuAnglesFilteredAll) >= 0) {
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

  return {
    ...state,
    response,
    location
  };
};

const fillAccelerometer = (state: IParserState): IParserState => {
  const { sensorMask, payload, response } = state;
  let { location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.accelerometerFilteredAll) >= 0) {
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

  return {
    ...state,
    response,
    location
  };
};

const fillLocator = (state: IParserState): IParserState => {
  const { sensorMask, payload, response } = state;
  let { location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.locatorAll) >= 0) {
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

  return {
    ...state,
    response,
    location
  };
};

const fillGyroV2 = (state: IParserState): IParserState => {
  const { sensorMask, payload, response } = state;
  let { location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.gyroFilteredAllV2) >= 0) {
    const multiplier = 2000.0 / 32767.0;
    let filteredX: number;
    let filteredY: number;
    let filteredZ: number;

    filteredX = convertBinaryToFloat(payload, location) * multiplier;
    location = location + 4;

    filteredY = convertBinaryToFloat(payload, location) * multiplier;
    location = location + 4;

    filteredZ = convertBinaryToFloat(payload, location) * multiplier;
    location = location + 4;

    response.gyro = {
      filtered: {
        x: filteredX,
        y: filteredY,
        z: filteredZ
      }
    };
  }

  return {
    ...state,
    response,
    location
  };
};

const fillGyroV21 = (state: IParserState): IParserState => {
  const { sensorMask, payload, response } = state;
  let { location } = state;
  if (sensorMask.v21.indexOf(SensorMaskV2.gyroFilteredAllV21) >= 0) {
    let filteredX: number;
    let filteredY: number;
    let filteredZ: number;

    filteredX = convertBinaryToFloat(payload, location);
    location = location + 4;

    filteredY = convertBinaryToFloat(payload, location);
    location = location + 4;

    filteredZ = convertBinaryToFloat(payload, location);
    location = location + 4;

    response.gyro = {
      filtered: {
        x: filteredX,
        y: filteredY,
        z: filteredZ
      }
    };
  }

  return {
    ...state,
    response,
    location
  };
};

export const parseSensorEvent = (
  payload: number[],
  sensorMask: ISensorMaskRaw
): ISensorResponse => {
  let state: IParserState = {
    payload,
    sensorMask,
    location: 0,
    response: {}
  };

  state = fillAngles(state);
  state = fillAccelerometer(state);
  state = fillGyroV2(state);
  state = fillLocator(state);
  state = fillGyroV21(state);

  return state.response;
};
