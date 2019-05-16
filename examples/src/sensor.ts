import { Scanner, Event, Utils, ICommandWithRaw } from 'spherov2.js';

// FUNCTIONS FOR PARSING IEE 765 FLOAT VALUES
// FROM 4 BYTE BINARY DATA

// function dec2FullBin(dec: number) {
//   // tslint:disable-next-line:no-bitwise
//   const str: string = (dec >>> 0).toString(2);
//   return '00000000'.substr(str.length) + str;
// }

function convertBinaryToFloat(
  nums: number[],
  offset: number,
  decimals: number
) {
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
  const f32 = view.getFloat32(0);

  // convert to number with X digits after comma
  return Number(f32.toFixed(decimals));
}

//////////////////////////////////

const main = async () => {
  function detectVolumeDirection(rotation: number) {
    let volumeUp: string = 'idle';
    if (rotation >= 25 && rotation <= 180) {
      volumeUp = 'up';
    } else if (rotation <= -25 && rotation >= -180) {
      volumeUp = 'down';
    }
    const noramlized: number = Math.round(((rotation + 180) / 360) * 100) / 100;
    return { volumeUp, scale: noramlized };
  }

  // Example to find a sphereo mini with a certain name
  const sphero = await Scanner.findSpheroMiniByName('SM-3F7D');

  if (sphero) {
    await sphero.configureSensorStream();
    await sphero.enableCollisionDetection();

    sphero.on(Event.onCollision, (command: ICommandWithRaw) => {
      // tslint:disable-next-line:no-console
      console.log('Sensor Read', command);
    });

    sphero.on(Event.onSensor, (command: ICommandWithRaw) => {
      // We get the data from the sensor as command.payload data
      // read out pitch, acc_z (dont really know if this is z-direction!), yaw
      // offset value defines the position in the payload
      // const pitch: number = convertBinaryToFloat(command.payload, 0, 2);
      // const accZ: number = convertBinaryToFloat(command.payload, 12, 2);
      const yaw: number = convertBinaryToFloat(command.payload, 8, 2);

      // Example output to show that the yaw is detected properly!
      const volDirection = detectVolumeDirection(yaw);

      // tslint:disable-next-line:no-console
      console.log('Direction', volDirection);

      // Output data for debugging as float point values
      // If there is more binary data bc of more sensors, just extend the offset to multiples of 4!
      // tslint:disable-next-line:no-console
      console.log(
        'Sensor Read',
        convertBinaryToFloat(command.payload, 0, 2),
        convertBinaryToFloat(command.payload, 4, 2),
        convertBinaryToFloat(command.payload, 8, 2),
        convertBinaryToFloat(command.payload, 12, 2),
        convertBinaryToFloat(command.payload, 16, 2),
        convertBinaryToFloat(command.payload, 20, 2)
      );

      // const line = command.payload
      //   .map((i: number) => `${i}`.padStart(3, '0'))
      //   .join(' ');
    });

    while (true) {
      await Utils.wait(1000);
    }
  }
};

main();
