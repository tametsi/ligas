<script lang="ts">
	import { TimerState } from '@lib/timer';
	import formatTime from '@lib/util/formatTime';
	import activeTimer from '@stores/activeTimer';

	let time: string;
	let interval: number;

	activeTimer.subscribe(x => {
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

<style lang="scss">
	span {
		font-family: 'Noto Mono', monospace;
		letter-spacing: -0.075em;
		font-size: inherit;
	}
</style>
