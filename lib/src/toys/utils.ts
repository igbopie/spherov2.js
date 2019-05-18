import {
  SensorMaskValues,
  SensorMaskV2,
  APIVersion,
  ISensorMaskRaw
} from './types';
import { ISensorResponse } from '../commands/types';

const sensorValuesToRawV2 = (
  sensorMask: SensorMaskValues[],
  apiVersion: APIVersion = APIVersion.V2
) =>
  sensorMask.reduce((v2, m) => {
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
  }, []);

const sensorValuesToRawV21 = (
  sensorMask: SensorMaskValues[],
  apiVersion: APIVersion = APIVersion.V2
) =>
  sensorMask.reduce((v21, m) => {
    let mask: SensorMaskV2;
    if (m === SensorMaskValues.gyro && apiVersion === APIVersion.V21) {
      mask = SensorMaskV2.gyroFilteredAllV21;
    }
    if (mask) {
      return [...v21, mask];
    }
    return v21;
  }, []);

export const sensorValuesToRaw = (
  sensorMask: SensorMaskValues[],
  apiVersion: APIVersion = APIVersion.V2
): ISensorMaskRaw => {
  return {
    v2: sensorValuesToRawV2(sensorMask, apiVersion),
    v21: sensorValuesToRawV21(sensorMask, apiVersion)
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
  floats: number[];
  sensorMask: ISensorMaskRaw;
}

const fillAngles = (state: IParserState): IParserState => {
  const { sensorMask, floats, response, location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.imuAnglesFilteredAll) >= 0) {
    response.angles = {
      pitch: floats[location],
      roll: floats[location + 1],
      yaw: floats[location + 2]
    };

    return {
      ...state,
      response,
      location: location + 3
    };
  }
  return state;
};

const fillAccelerometer = (state: IParserState): IParserState => {
  const { sensorMask, floats, response, location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.accelerometerFilteredAll) >= 0) {
    response.accelerometer = {
      filtered: {
        x: floats[location],
        y: floats[location + 1],
        z: floats[location + 2]
      }
    };
    return {
      ...state,
      response,
      location: location + 3
    };
  }
  return state;
};

const fillLocator = (state: IParserState): IParserState => {
  const { sensorMask, floats, response, location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.locatorAll) >= 0) {
    const metersToCentimeters = 100.0;
    response.locator = {
      position: {
        x: floats[location] * metersToCentimeters,
        y: floats[location + 1] * metersToCentimeters
      },
      velocity: {
        x: floats[location + 2] * metersToCentimeters,
        y: floats[location + 3] * metersToCentimeters
      }
    };
    return {
      ...state,
      response,
      location: location + 4
    };
  }

  return state;
};

const fillGyroV2 = (state: IParserState): IParserState => {
  const { sensorMask, floats, response, location } = state;
  if (sensorMask.v2.indexOf(SensorMaskV2.gyroFilteredAllV2) >= 0) {
    const multiplier = 2000.0 / 32767.0;
    response.gyro = {
      filtered: {
        x: floats[location] * multiplier,
        y: floats[location + 1] * multiplier,
        z: floats[location + 2] * multiplier
      }
    };

    return {
      ...state,
      response,
      location: location + 3
    };
  }
  return state;
};

const fillGyroV21 = (state: IParserState): IParserState => {
  const { sensorMask, floats, response, location } = state;
  if (sensorMask.v21.indexOf(SensorMaskV2.gyroFilteredAllV21) >= 0) {
    response.gyro = {
      filtered: {
        x: floats[location],
        y: floats[location + 1],
        z: floats[location + 2]
      }
    };

    return {
      ...state,
      response,
      location: location + 3
    };
  }
  return state;
};

const tranformToFloat = (bytes: number[]): number[] => {
  const floats: number[] = [];

  for (let i = 0; i < bytes.length; i += 4) {
    floats.push(convertBinaryToFloat(bytes, i));
  }
  return floats;
};

export const parseSensorEvent = (
  payload: number[],
  sensorMask: ISensorMaskRaw
): ISensorResponse => {
  let state: IParserState = {
    floats: tranformToFloat(payload),
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
