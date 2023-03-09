<script lang="ts">
	import type Runner from '@lib/runner';
	import formatTime from '@lib/util/formatTime';
	import { TimerState } from '@lib/timer';
	import activeSession from '@stores/activeSession';

	export let runner: Runner;
	export let edit = false;
	export let row = false;

	let nameBig = runner.alias || runner.name || '';
	let nameSmall = runner.alias ? runner.name : '';
	let roundsCounted: number;
	let lastRoundLength: string;
	let roundTrend: number;

	function update() {
		roundsCounted = runner.rounds.count;
		lastRoundLength = formatTime(runner.rounds.last);
		roundTrend = Math.round(runner.rounds.trend / 1000);
	}
	update();

	function finishRound() {
		if ($activeSession.timer.state === TimerState.Running && !edit) {
			runner.rounds.addByTime($activeSession.timer.getRunDuration());
			update();
		}
	}

	function deleteSelf() {
		if (confirm('Do you really want to delete this runner?'))
			activeSession.updateSelf(session =>
				session.run.deleteRunner(runner.id)
			);
	}
</script>

<button class="runner" class:row class:no-edit={!edit} on:click={finishRound}>
	<p class="name-big">{nameBig}</p>
	{#if nameSmall}
		<p class="name-small">
			{nameSmall}
		</p>
	{/if}
	<div class="details">
		{#if edit}
			<button on:click={deleteSelf} class="button small warning">
				Delete
			</button>
		{:else}
			<span class="rounds">{roundsCounted}</span>
			<span class="round-time">{lastRoundLength}</span>
			<span
				class="round-trend"
				class:trend-negative={roundTrend > 0}
				class:trend-positive={roundTrend < 0}
				>{roundTrend > 0 ? '+' : ''}{roundTrend}s</span
			>
		{/if}
	</div>
</button>
