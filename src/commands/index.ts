import api from './api';
import driving from './driving';
import { encode } from './encoder';
import power from './power';
import somethingApi from './something-api';
import systemInfo from './system-info';
import sensor from './sensor';
import { Flags, ICommandPartial, ICommandWithRaw, DriveFlag } from './types';
import userIo from './user-io';
import { Stance } from '../toys/types';

// WORKAROUND for https://github.com/Microsoft/TypeScript/issues/5711
export interface IReExport {
  a: DriveFlag;
  b: Stance;
}

const sequencer = () => {
  let s = 0;
  return () => {
    const temp = s;
    s += 1;
    if (s >= 255) {
      s = 0;
    }
    return temp;
  };
};

export const factory = (seq?: () => number) => {
  const getSequence = seq || sequencer();

  const gen = (deviceId: number) => (part: ICommandPartial): ICommandWithRaw =>
    encode({
      ...part,
      commandFlags: [Flags.requestsResponse, Flags.resetsInactivityTimeout],
      deviceId,
      sequenceNumber: getSequence()
    });

  return {
    api: api(gen),
    driving: driving(gen),
    power: power(gen),
    somethingApi: somethingApi(gen),
    systemInfo: systemInfo(gen),
    userIo: userIo(gen),
    sensor: sensor(gen)
  };
};
