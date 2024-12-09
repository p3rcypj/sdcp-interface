export function formatMilliseconds(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600));
    const minutes = String(Math.floor((totalSeconds % 3600) / 60));
    const seconds = String(totalSeconds % 60);

    return [hours, minutes, seconds].map(time => time.padStart(2, "0")).join(":");
}

export function formatSeconds(seconds: number) {
    const totalSeconds = Math.floor(seconds);
    const hours = String(Math.floor(totalSeconds / 3600));
    const minutes = String(Math.floor((totalSeconds % 3600) / 60));
    const remainingSeconds = String(totalSeconds % 60);

    return [hours, minutes, remainingSeconds].map(time => time.padStart(2, "0")).join(":");
}
