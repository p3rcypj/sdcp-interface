export function darken(color: string, percent: number): string {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return `#${(
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
}

export function hexToRgba(color: string, alpha: number) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const darkgrey = {
    "50": darken("#fafafa", 40),
    "100": darken("#f5f5f5", 40),
    "200": darken("#eeeeee", 40),
    "300": darken("#e0e0e0", 40),
    "400": darken("#bdbdbd", 40),
    "500": darken("#9e9e9e", 40),
    "600": darken("#757575", 40),
    "700": darken("#616161", 40),
    "800": darken("#424242", 40),
    "900": darken("#212121", 40),
    A100: darken("#f5f5f5", 40),
    A200: darken("#eeeeee", 40),
    A400: darken("#bdbdbd", 40),
    A700: darken("#616161", 40),
};
