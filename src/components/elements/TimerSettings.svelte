<script lang="ts">
	import activeSession from '@stores/activeSession';
	import FormItem from '@components/elements/FormItem.svelte';
	import { TimerDirection } from '@lib/timer';
	import { _ } from '@lib/util/translations';

	const { direction, runtime } = $activeSession.timer;
	let [minutes, seconds, infinite] = [
		isFinite($runtime) ? Math.floor($runtime / 60000) : 30,
		isFinite($runtime) ? Math.floor($runtime / 1000) % 60 : 0,
		$runtime === Infinity,
	];
	$: runtime.set(infinite ? Infinity : (minutes * 60 + seconds) * 1000);
	$: minutes = Math.min(Math.max(0, minutes), 59);
	$: seconds = Math.min(Math.max(0, seconds), 59);
</script>

<FormItem name={$_('timer.settings.title')}>
	<input
		type="number"
		min="0"
		max="59"
		bind:value={minutes}
		class="input my-2"
		class:brightness-90={infinite}
		readonly={infinite}
	/>
	{$_('timer.settings.minutes')}
	<input
		type="number"
		min="0"
		max="59"
		bind:value={seconds}
		class="input my-2"
		class:brightness-90={infinite}
		readonly={infinite}
	/>
	{$_('timer.settings.seconds')}
	<br />
	<div class="grid grid-flow-col items-center gap-2">
		<select
			class="select select-sm"
			bind:value={$direction}
			class:brightness-90={infinite}
			disabled={infinite}
		>
			<option value={TimerDirection.Upwards}
				>{$_('timer.settings.up')}</option
			>
			<option value={TimerDirection.Downwards}
				>{$_('timer.settings.down')}</option
			>
		</select>
		<label for="timer_infinite" class="label justify-normal gap-1">
			<input
				id="timer_infinite"
				type="checkbox"
				class="checkbox"
				on:change={e => {
					if (e.target['checked'])
						$direction = TimerDirection.Upwards;
				}}
				bind:checked={infinite}
			/>
			<span class="label-text">{$_('timer.settings.infinite')}</span>
		</label>
	</div>
</FormItem>
