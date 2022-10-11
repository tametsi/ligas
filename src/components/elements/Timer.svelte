<script lang="ts">
	import { TimerState } from '@lib/timer';
	import formatTime from '@lib/util/formatTime';
	import activeSession from '@stores/activeSession';

	let time: string;
	let interval: number;

	activeSession.subscribe(session => {
		const timer = session.timer;
		const updateTime = () => (time = formatTime(timer.getRunDuration()));
		updateTime();

		if (timer.state === TimerState.running && interval === undefined)
			interval = setInterval(updateTime, 100, undefined);
		else if (timer.state === TimerState.stopped && interval >= 0) {
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
