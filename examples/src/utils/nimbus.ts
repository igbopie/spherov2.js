import { devices, HID } from 'node-hid';

export interface IDPad {
  xRaw: number;
  yRaw: number;
  x: number;
  y: number;
  module: number;
  angle: number;
}

export interface IControllerState {
  a: number;
  b: number;
  x: number;
  y: number;
  leftStick: IDPad;
  rightStick: IDPad;
  r2: number;
  l2: number;
}

enum Buttons {
  A = 4,
  B = 5,
  X = 6,
  Y = 7,
  LeftStickY = 14,
  LeftStickX = 13,
  RightStickY = 16,
  RightStickX = 15,
  R2 = 11,
  L2 = 10,
}

const MAX_D_PAD = 127;
const devs = devices();
const deviceInfo = devs.find((d) => d.vendorId === 273 && d.productId === 5152);

if ( !deviceInfo ) {
  // tslint:disable-next-line:no-console
    console.error('Could not find device in device list');
    process.exit(1);
}

const device = new HID( deviceInfo.path );
const calculate = ({ xRaw, yRaw }: { xRaw: number, yRaw: number }) => {
  const x = xRaw / MAX_D_PAD;
  const y = yRaw / MAX_D_PAD;
  const module = Math.sqrt(x * x + y * y);
  let angle = (Math.atan(y / x) * (180 / Math.PI)) * - 1 + 90;
  if (x < 0) {
    angle += 180;
  }

  return {
    xRaw,
    yRaw,
    x,
    y,
    module: module > 1 ? 1 : module,
    angle,
  };
};

let state: IControllerState;
let cb = (_state: IControllerState) => { return; };

// looks like buttons have intensity yay!
device.on('data', (data: Buffer) => {
  state = {
    a: data.readUInt8(Buttons.A),
    b: data.readUInt8(Buttons.B),
    x: data.readUInt8(Buttons.X),
    y: data.readUInt8(Buttons.Y),
    leftStick: {
      xRaw: data.readInt8(Buttons.LeftStickX),
      yRaw: data.readInt8(Buttons.LeftStickY),
      x: 0,
      y: 0,
      module: 0,
      angle: 0,
    },
    rightStick: {
      xRaw: data.readInt8(Buttons.RightStickX),
      yRaw: data.readInt8(Buttons.RightStickY),
      x: 0,
      y: 0,
      module: 0,
      angle: 0,
    },
    r2: data.readUInt8(Buttons.R2),
    l2: data.readUInt8(Buttons.L2),
  };
  state.leftStick = calculate(state.leftStick);
  state.rightStick = calculate(state.rightStick);
  cb(state);
});

device.on('error', (err) => {
  // tslint:disable-next-line:no-console
  console.error('error:', err);
});

export default {
  close() {
    device.close();
  },
  onChanged(fn: (data: IControllerState) => void) {
    cb = fn;
  },
  getState() {
    return state;
  },
};
