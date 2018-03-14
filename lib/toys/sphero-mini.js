"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decoder_1 = require("../commands/decoder");
// tslint:disable-next-line:no-unused-variable
const core_1 = require("./core");
class SpheroMini extends core_1.Core {
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
    async appVersion() {
        const response = await this.queueCommand(this.commands.systemInfo.appVersion());
        return {
            major: decoder_1.number(response.command.payload, 1),
            minor: decoder_1.number(response.command.payload, 3),
        };
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
    something1() {
        return this.queueCommand(this.commands.systemInfo.something());
    }
    something2() {
        return this.queueCommand(this.commands.power.something2());
    }
    something3() {
        return this.queueCommand(this.commands.power.something3());
    }
    something4() {
        return this.queueCommand(this.commands.power.something4());
    }
    something5() {
        return this.queueCommand(this.commands.somethingApi.something5());
    }
    something6() {
        return this.queueCommand(this.commands.systemInfo.something6());
    }
    something7() {
        return this.queueCommand(this.commands.systemInfo.something7());
    }
}
SpheroMini.advertisement = {
    name: 'Sphero Mini',
    prefix: 'SM-',
};
exports.SpheroMini = SpheroMini;
