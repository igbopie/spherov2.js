"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rollable_toy_1 = require("./rollable-toy");
class R2D2 extends rollable_toy_1.RollableToy {
    wake() {
        return this.queueCommand(this.commands.power.wake());
    }
    sleep() {
        return this.queueCommand(this.commands.power.sleep());
    }
    playAudioFile(idx) {
        return this.queueCommand(this.commands.userIo.playAudioFile(idx));
    }
    turnDome(angle) {
        const res = this.calculateDomeAngle(angle);
        return this.queueCommand(this.commands.userIo.turnDome(res));
    }
    setStance(stance) {
        return this.queueCommand(this.commands.userIo.setStance(stance));
    }
    playAnimation(animation) {
        return this.queueCommand(this.commands.userIo.playAnimation(animation));
    }
    // TODO: Refractor this and simplify
    // utility calculation for dome rotation
    calculateDomeAngle(angle) {
        const result = new Uint8Array(2);
        switch (angle) {
            case -1:
                result[0] = 0xbf;
                result[1] = 0x80;
                return result;
            case 0:
                result[0] = 0x00;
                result[1] = 0x00;
                return result;
            case 1:
                result[0] = 0x3f;
                result[1] = 0x80;
                return result;
        }
        let uAngle = Math.abs(angle);
        const hob = R2D2.hobIndex(uAngle);
        const unshift = Math.min(8 - hob, 6);
        const shift = 6 - unshift;
        // tslint:disable-next-line:no-bitwise
        uAngle = uAngle << unshift;
        if (angle < 0) {
            // tslint:disable-next-line:no-bitwise
            uAngle = 0x8000 | uAngle;
        }
        // tslint:disable-next-line:no-bitwise
        uAngle = 0x4000 | uAngle;
        // tslint:disable-next-line:no-bitwise
        const flagA = (0x04 & shift) >> 2;
        // tslint:disable-next-line:no-bitwise
        const flagB = (0x02 & shift) >> 1;
        // tslint:disable-next-line:no-bitwise
        const flagC = 0x01 & shift;
        if (flagA === 1) {
            // tslint:disable-next-line:no-bitwise
            uAngle |= 1 << 9;
        }
        else {
            // tslint:disable-next-line:no-bitwise
            uAngle &= uAngle ^ (1 << 9);
        }
        if (flagB === 1) {
            // tslint:disable-next-line:no-bitwise
            uAngle |= 1 << 8;
        }
        else {
            // tslint:disable-next-line:no-bitwise
            uAngle &= uAngle ^ (1 << 8);
        }
        if (flagC === 1) {
            // tslint:disable-next-line:no-bitwise
            uAngle |= 1 << 7;
        }
        else {
            // tslint:disable-next-line:no-bitwise
            uAngle &= uAngle ^ (1 << 7);
        }
        // tslint:disable-next-line:no-bitwise
        result[0] = 0x00ff & uAngle;
        // tslint:disable-next-line:no-bitwise
        result[1] = (0xff00 & uAngle) >> 8;
        return result;
    }
    static hobIndex(val) {
        const values = new Uint16Array(2);
        values[1] = 0;
        values[0] = val;
        while (values[0] > 0) {
            // tslint:disable-next-line
            values[0] = values[0] >> 1;
            values[1] = values[1] + 1;
        }
        return values[1];
    }
}
R2D2.advertisement = {
    name: 'R2-D2',
    prefix: 'D2-',
    class: R2D2
};
exports.R2D2 = R2D2;
