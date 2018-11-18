import { IToyAdvertisement } from './types';
import { RollableToy } from './rollable-toy';
import { IQueuePayload } from './core';

export class SpheroMini extends RollableToy {
  public static advertisement: IToyAdvertisement = {
    name: 'Sphero Mini',
    prefix: 'SM-',
    class: SpheroMini
  };

  public enableCollisionDetection(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.sensor.enableCollisionAsync());
  }

  public configureCollisionDetection(
    xThreshold: number = 100,
    yThreshold: number = 100,
    xSpeed: number = 100,
    ySpeed: number = 100,
    deadTime: number = 10,
    method: number = 0x01
  ): Promise<IQueuePayload> {
    return this.queueCommand(
      this.commands.sensor.configureCollision(
        xThreshold,
        yThreshold,
        xSpeed,
        ySpeed,
        deadTime,
        method
      )
    );
  }

  public async configureSensorStream(): Promise<IQueuePayload> {
    // 8d:0a:18:0f:0b:01:c2:d8 - response:  8d:09:18:0f:0b:00:c4:d8
    // 8d:0a:18:17:0c:00:ba:d8 - response:  8d:09:18:17:0c:00:bb:d8
    // 8d:0a:18:0c:0f:00:00:00:00:c2:d8
    // 8d:0a:18:00:4c:00:32:00:00:07:e0:78:00:d8
    // 8d:0a:18:00:0e:00:32:00:00:00:00:00:9d:d8  - payload: 00:32:00:00:00:00:00
    // await this.queueCommand(this.commands.sensor.sensor1());
    // await this.queueCommand(this.commands.sensor.sensor2());
    // await this.queueCommand(this.commands.sensor.sensorMask(
    //   [0x00, 0x32, 0x00, 0x00, 0x00, 0x00, 0x00],
    // ));

    // I could not really figure out what this does, but according to another project, this enables certain sensors!
    // This worked to get accelorator data and pitch, yaw, roll data
    await this.queueCommand(
      this.commands.sensor.sensorMask([
        0x00,
        0x25,
        0x00,
        0x00,
        0b111,
        0b0,
        0x00
      ])
    );
    return await this.queueCommand(
      this.commands.sensor.configureSensorStream()
    );
  }

  public something1(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.systemInfo.something());
  }

  public something2(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.something2());
  }

  public something3(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.something3());
  }

  public something4(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.power.something4());
  }

  public something5(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.somethingApi.something5());
  }

  public something6(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.systemInfo.something6());
  }

  public something7(): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.systemInfo.something7());
  }
}
