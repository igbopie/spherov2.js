"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    enableCollisionDetection() {
        return this.queueCommand(this.commands.sensor.enableCollisionAsync());
    }
    configureCollisionDetection(xThreshold = 100, yThreshold = 100, xSpeed = 100, ySpeed = 100, deadTime = 10, method = 0x01) {
        return this.queueCommand(this.commands.sensor.configureCollision(xThreshold, yThreshold, xSpeed, ySpeed, deadTime, method));
    }
    async configureSensorStream() {
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
        return await this.queueCommand(this.commands.sensor.configureSensorStream());
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
    class: SpheroMini,
};
exports.SpheroMini = SpheroMini;
