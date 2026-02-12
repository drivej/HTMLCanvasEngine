export default class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    static green: Color;
    static red: Color;
    static black: Color;
    static transparent: Color;
    constructor(r?: number, g?: number, b?: number, a?: number);
    interpolate(toColor: Color, p: number): Color;
    toRGB(): string;
    toRGBA(): string;
    clone(): Color;
    copy(color: Color): void;
    static random(): Color;
}
