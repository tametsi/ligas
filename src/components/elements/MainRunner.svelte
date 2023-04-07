<script lang="ts">
	import type Runner from '@lib/runner';
	import formatTime from '@lib/util/formatTime';
	import activeSession from '@stores/activeSession';
	import RunnerTitle from './RunnerTitle.svelte';
	import { get } from 'svelte/store';

	export let runner: Runner;

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
		if ($activeSession.timer.running) {
			runner.rounds.addByTime(get($activeSession.timer.passed));
			update();
		}
	}
</script>

<button class="card card-compact w-80 bg-base-100" on:click={finishRound}>
	<div class="card-body">
		<RunnerTitle {runner} />

		<div class="flex justify-between gap-2">
			<span>{roundsCounted}</span>
			<span>{lastRoundLength}</span>
			<span
				class:text-error={roundTrend > 0}
				class:text-success={roundTrend < 0}
				>{roundTrend > 0 ? '+' : ''}{roundTrend}s</span
			>
		</div>
	</div>
</button>
