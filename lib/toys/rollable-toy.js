"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-unused-variable
const core_1 = require("./core");
class RollableToy extends core_1.Core {
    roll(speed, heading, flags) {
        return this.queueCommand(this.commands.driving.drive(speed, heading, flags));
    }
    async rollTime(speed, heading, time, flags) {
        let drive = true;
        setTimeout(() => drive = false, time);
        while (drive) {
            await this.queueCommand(this.commands.driving.drive(speed, heading, flags));
        }
        await this.queueCommand(this.commands.driving.drive(0, heading, flags));
    }
    allLEDsRaw(payload) {
        return this.queueCommand(this.commands.userIo.allLEDsRaw(payload));
    }
    setBackLedIntensity(i) {
        return this.queueCommand(this.commands.userIo.setBackLedIntensity(i));
    }
    setMainLedBlueIntensity(i) {
        return this.queueCommand(this.commands.userIo.setMainLedBlueIntensity(i));
    }
    setMainLedColor(r, g, b) {
        return this.queueCommand(this.commands.userIo.setMainLedColor(r, g, b));
    }
    setMainLedGreenIntensity(i) {
        return this.queueCommand(this.commands.userIo.setMainLedGreenIntensity(i));
    }
    setMainLedRedIntensity(i) {
        return this.queueCommand(this.commands.userIo.setMainLedRedIntensity(i));
    }
}
exports.RollableToy = RollableToy;
