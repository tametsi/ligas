const padTime = (time: number) => time.toString().padStart(2, '0');

export const formatTime = (ms: number) => {
    if (isNaN(ms)) return '00:00:00';

    const date = new Date(ms);
    const minutes = padTime(date.getUTCMinutes());
    const seconds = padTime(date.getUTCSeconds());
    const centis = padTime(Math.floor(date.getUTCMilliseconds() / 10));

    return `${minutes}:${seconds}:${centis}`;
};