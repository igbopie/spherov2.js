"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decoder_1 = require("../commands/decoder");
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
}
SpheroMini.advertisement = {
    name: 'Sphero Mini',
    prefix: 'SM-',
};
exports.SpheroMini = SpheroMini;
//# sourceMappingURL=sphero-mini.js.map