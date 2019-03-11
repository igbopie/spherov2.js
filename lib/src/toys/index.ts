import { SpheroBolt } from './sphero-bolt';
import { SpheroMini } from './sphero-mini';
import { R2Q5 } from './r2q5';
import { R2D2 } from './r2d2';
import { LightningMcQueen } from './lightning-mcqueen';
import { BB9E } from './bb9e';

export const toys = [
  BB9E,
  LightningMcQueen,
  R2D2,
  R2Q5,
  SpheroMini,
  SpheroBolt
].map(c => c.advertisement);
