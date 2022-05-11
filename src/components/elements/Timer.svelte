<script lang="ts">
	import { TimerState } from '../../lib/timer';
	import activeTimer from '../../stores/activeTimer';

	let time: string;
	let interval: number;

	activeTimer.subscribe(x => {
		const updateTime = () => {
			// TODO time formatting
			time = x.getRunDuration().toString();
		}

		if (x.state === TimerState.running && interval === undefined)
			interval = setInterval(
				updateTime,
				100,
				undefined
			);
		else if (x.state === TimerState.stopped && interval >= 0) {
			clearInterval(interval);
			interval = undefined;
			updateTime();
		}
	});
</script>

<span>{time}</span>
