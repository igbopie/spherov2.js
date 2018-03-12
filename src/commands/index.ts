import api from './api';
import driving from './driving';
import { encode } from './encoder';
import power from './power';
import systemInfo from './system-info';
// tslint:disable-next-line:no-unused-variable
import { DriveFlag, ICommandPartial, ICommandWithRaw } from './types';

const sequencer = () => {
  let s = 0;
  return () => {
    const temp = s;
    s += 1;
    return temp;
  };
};

export const factory = (seq?: () => number) => {
  const getSequence = seq || sequencer();

  const gen = (deviceId: number) => (part: ICommandPartial) => encode({
    ...part,
    deviceId,
    sequenceNumber: getSequence(),
  });

  return {
    api: api(gen),
    driving: driving(gen),
    power: power(gen),
    systemInfo: systemInfo(gen),
  };
};
