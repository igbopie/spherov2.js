"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
exports.default = (generator) => {
    const encode = generator(types_1.DeviceId.userIO);
    const encodeAnimatronics = generator(types_1.DeviceId.animatronics);
    return {
        allLEDsRaw: (payload) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload
        }),
        setBackLedIntensity: (i) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x01, i]
        }),
        setMainLedBlueIntensity: (b) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x08, b]
        }),
        setMainLedColor: (r, g, b) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x70, r, g, b]
        }),
        setMainLedGreenIntensity: (g) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x04, g]
        }),
        setMainLedRedIntensity: (r) => encode({
            commandId: types_1.UserIOCommandIds.allLEDs,
            payload: [0x00, 0x02, r]
        }),
        playAudioFile: (idx) => encode({
            commandId: types_1.UserIOCommandIds.playAudioFile,
            payload: [idx, 0x00, 0x00]
        }),
        turnDome: (angle) => encodeAnimatronics({
            commandId: types_1.AnimatronicsCommandIds.domePosition,
            payload: [angle[1], angle[0], 0x00, 0x00]
        }),
        setStance: (stance) => encodeAnimatronics({
            commandId: types_1.AnimatronicsCommandIds.shoulderAction,
            payload: [stance]
        }),
        playAnimation: (animation) => encodeAnimatronics({
            commandId: types_1.AnimatronicsCommandIds.animationBundle,
            payload: [0x00, animation]
        })
    };
};
