export interface IDPad {
    xRaw: number;
    yRaw: number;
    x: number;
    y: number;
    module: number;
    angle: number;
}
export interface IControllerState {
    a: number;
    b: number;
    x: number;
    y: number;
    leftStick: IDPad;
    rightStick: IDPad;
    r2: number;
    l2: number;
}
declare const _default: {
    close(): void;
    onChanged(fn: (data: IControllerState) => void): void;
    getState(): IControllerState;
};
export default _default;
