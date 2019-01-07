import { Core, IQueuePayload } from './core';

export class RollableToy extends Core {
  /**
   * Rolls the toy
   * @param  speed   speed to roll the toy (0 to 255)
   * @param  heading heading in degrees (0 to 360)
   * @param  flags   [description]
   * @return         [description]
   */
  public roll(
    speed: number,
    heading: number,
    flags: number[]
  ): Promise<IQueuePayload> {
    return this.queueCommand(
      this.commands.driving.drive(speed, heading, flags)
    );
  }

  /**
   * Rolls the toy
   * @param  speed   speed to roll the toy (0 to 255)
   * @param  heading heading in degrees (0 to 360)
   * @param  time    time to roll in milliseconds
   * @param  flags   [description]
   * @return         [description]
   */
  public async rollTime(
    speed: number,
    heading: number,
    time: number,
    flags: number[]
  ) {
    let drive: boolean = true;
    setTimeout(() => (drive = false), time);
    while (drive) {
      await this.queueCommand(
        this.commands.driving.drive(speed, heading, flags)
      );
    }
    await this.queueCommand(this.commands.driving.drive(0, heading, flags));
  }

  public allLEDsRaw(payload: number[]): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.allLEDsRaw(payload));
  }

  /**
   * Sets the intensity of the backlight LED
   * @param  i intensity (0 to 255)
   */
  public setBackLedIntensity(i: number): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.setBackLedIntensity(i));
  }

  /**
   * Sets the intensity of the blue main LED
   * @param  i intensity (0 to 255)
   */
  public setMainLedBlueIntensity(i: number): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.setMainLedBlueIntensity(i));
  }

  /**
   * Sets the color of the main LEDs
   * @param  r intensity of the red LED (0 to 255)
   * @param  g intensity of the green LED (0 to 255)
   * @param  b intensity of the blue LED (0 to 255)
   * @return   [description]
   */
  public setMainLedColor(
    r: number,
    g: number,
    b: number
  ): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.setMainLedColor(r, g, b));
  }

  /**
   * Sets the intensity of the green main LED
   * @param  i intensity (0 to 255)
   */
  public setMainLedGreenIntensity(i: number): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.setMainLedGreenIntensity(i));
  }

  /**
   * Sets the intensity of the red main LED
   * @param  i intensity (0 to 255)
   */
  public setMainLedRedIntensity(i: number): Promise<IQueuePayload> {
    return this.queueCommand(this.commands.userIo.setMainLedRedIntensity(i));
  }
}
