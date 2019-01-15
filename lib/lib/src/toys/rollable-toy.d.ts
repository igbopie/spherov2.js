import { Core, IQueuePayload } from './core';
export declare class RollableToy extends Core {
    /**
     * Rolls the toy
     * @param  speed   speed to roll the toy (0 to 255)
     * @param  heading heading in degrees (0 to 360)
     * @param  flags   [description]
     * @return         [description]
     */
    roll(speed: number, heading: number, flags: number[]): Promise<IQueuePayload>;
    /**
     * Rolls the toy
     * @param  speed   speed to roll the toy (0 to 255)
     * @param  heading heading in degrees (0 to 360)
     * @param  time    time to roll in milliseconds
     * @param  flags   [description]
     * @return         [description]
     */
    rollTime(speed: number, heading: number, time: number, flags: number[]): Promise<void>;
    allLEDsRaw(payload: number[]): Promise<IQueuePayload>;
    /**
     * Sets the intensity of the backlight LED
     * @param  i intensity (0 to 255)
     */
    setBackLedIntensity(i: number): Promise<IQueuePayload>;
    /**
     * Sets the intensity of the blue main LED
     * @param  i intensity (0 to 255)
     */
    setMainLedBlueIntensity(i: number): Promise<IQueuePayload>;
    /**
     * Sets the color of the main LEDs
     * @param  r intensity of the red LED (0 to 255)
     * @param  g intensity of the green LED (0 to 255)
     * @param  b intensity of the blue LED (0 to 255)
     * @return   [description]
     */
    setMainLedColor(r: number, g: number, b: number): Promise<IQueuePayload>;
    /**
     * Sets the intensity of the green main LED
     * @param  i intensity (0 to 255)
     */
    setMainLedGreenIntensity(i: number): Promise<IQueuePayload>;
    /**
     * Sets the intensity of the red main LED
     * @param  i intensity (0 to 255)
     */
    setMainLedRedIntensity(i: number): Promise<IQueuePayload>;
}
