<script lang="ts">
	import { TimerState } from '../../lib/timer';
	import activeTimer from '../../stores/activeTimer';

	let time: string;
	let interval: number;

	activeTimer.subscribe(x => {
		const padTime = (time: number) => time.toString().padStart(2, '0');

		const formatTime = (ms: number) => {
			if (isNaN(ms)) return '00:00:00';

			const date = new Date(ms);
			const minutes = padTime(date.getUTCMinutes());
			const seconds = padTime(date.getUTCSeconds());
			const centis = padTime(Math.floor(date.getUTCMilliseconds() / 10));

			return `${minutes}:${seconds}:${centis}`;
		};

		const updateTime = () => (time = formatTime(x.getRunDuration()));
		updateTime();

		if (x.state === TimerState.running && interval === undefined)
			interval = setInterval(updateTime, 100, undefined);
		else if (x.state === TimerState.stopped && interval >= 0) {
			clearInterval(interval);
			interval = undefined;
			updateTime();
		}
	});
</script>

<span>{time}</span>
