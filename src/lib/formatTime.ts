export default function formatTime(ms: number) {
	function padTime(time: number) {
		return time.toString().padStart(2, '0');
	}

	if (isNaN(ms)) return '00:00:00';

	const date = new Date(ms);
	const minutes = padTime(date.getUTCMinutes());
	const seconds = padTime(date.getUTCSeconds());
	const centis = padTime(Math.floor(date.getUTCMilliseconds() / 10));

	return `${minutes}:${seconds}:${centis}`;
}
