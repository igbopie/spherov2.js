"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
class RollableToy extends core_1.Core {
    /**
     * Rolls the toy
     * @param  speed   speed to roll the toy (0 to 255)
     * @param  heading heading in degrees (0 to 360)
     * @param  flags   [description]
     * @return         [description]
     */
    roll(speed, heading, flags) {
        return this.queueCommand(this.commands.driving.drive(speed, heading, flags));
    }
    /**
     * Rolls the toy
     * @param  speed   speed to roll the toy (0 to 255)
     * @param  heading heading in degrees (0 to 360)
     * @param  time    time to roll in milliseconds
     * @param  flags   [description]
     * @return         [description]
     */
    async rollTime(speed, heading, time, flags) {
        let drive = true;
        setTimeout(() => (drive = false), time);
        while (drive) {
            await this.queueCommand(this.commands.driving.drive(speed, heading, flags));
        }
        await this.queueCommand(this.commands.driving.drive(0, heading, flags));
    }
    allLEDsRaw(payload) {
        return this.queueCommand(this.commands.userIo.allLEDsRaw(payload));
    }
    /**
     * Sets the intensity of the backlight LED
     * @param  i intensity (0 to 255)
     */
    setBackLedIntensity(i) {
        return this.queueCommand(this.commands.userIo.setBackLedIntensity(i));
    }
    /**
     * Sets the intensity of the blue main LED
     * @param  i intensity (0 to 255)
     */
    setMainLedBlueIntensity(i) {
        return this.queueCommand(this.commands.userIo.setMainLedBlueIntensity(i));
    }
    /**
     * Sets the color of the main LEDs
     * @param  r intensity of the red LED (0 to 255)
     * @param  g intensity of the green LED (0 to 255)
     * @param  b intensity of the blue LED (0 to 255)
     * @return   [description]
     */
    setMainLedColor(r, g, b) {
        return this.queueCommand(this.commands.userIo.setMainLedColor(r, g, b));
    }
    /**
     * Sets the intensity of the green main LED
     * @param  i intensity (0 to 255)
     */
    setMainLedGreenIntensity(i) {
        return this.queueCommand(this.commands.userIo.setMainLedGreenIntensity(i));
    }
    /**
     * Sets the intensity of the red main LED
     * @param  i intensity (0 to 255)
     */
    setMainLedRedIntensity(i) {
        return this.queueCommand(this.commands.userIo.setMainLedRedIntensity(i));
    }
}
exports.RollableToy = RollableToy;
