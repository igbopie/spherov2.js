"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rollable_toy_1 = require("./rollable-toy");
class SpheroMini extends rollable_toy_1.RollableToy {
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
        // I could not really figure out what this does, but according to another project, this enables certain sensors!
        // This worked to get accelorator data and pitch, yaw, roll data
        await this.queueCommand(this.commands.sensor.sensorMask([
            0x00,
            0x25,
            0x00,
            0x00,
            0b111,
            0b0,
            0x00
        ]));
        return await this.queueCommand(this.commands.sensor.configureSensorStream());
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
    class: SpheroMini
};
exports.SpheroMini = SpheroMini;
