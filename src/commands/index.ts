
import power from './power';
import api from './api';
import driving from './driving';
import { encode } from "./encoder";
import { CommandPartial } from './types';

const sequencer = () => {
  let s = 0;
  return () => {
    let temp = s;
    s += 1;
    return temp;
  }
}


export const factory = () => {
  const getSequence = sequencer();

  const gen = (deviceId: number) => (part: CommandPartial) => encode({
    ...part,
    deviceId,
    sequenceNumber: getSequence()
  });

  return {
    power: power(gen),
    api: api(gen),
    driving: driving(gen)
  }
}


