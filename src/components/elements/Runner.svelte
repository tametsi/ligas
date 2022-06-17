<script lang="ts">
	import type Runner from '@lib/runner';
	import formatTime from '@lib/util/formatTime';
	import { TimerState } from '@lib/timer';
	import activeTimer from '@stores/activeTimer';
	import activeRun from '@stores/activeRun';

	export let runner: Runner;
	export let edit = false;

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
		if ($activeTimer.state === TimerState.running && !edit) {
			runner.rounds.addByTime($activeTimer.getRunDuration());
			update();
		}
	}

	function deleteSelf() {
		if (confirm('Do you really want to delete this runner?'))
			activeRun.updateSelf(x => x.deleteRunner(runner.id));
	}
</script>

<div class="runner" class:no-edit={!edit} on:click={finishRound}>
	<p class="name-big">{nameBig}</p>
	{#if nameSmall}
		<p class="name-small">
			{nameSmall}
		</p>
	{/if}
	<div class="details">
		{#if edit}
			<button on:click={deleteSelf} class="button small">Delete</button>
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
</div>

<style lang="scss">
	.runner {
		display: flex;
		justify-content: space-between;
		flex-flow: column nowrap;

		user-select: none;
		cursor: default;

		background-color: var(--clr-bg2);
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin: 1rem;

		width: clamp(20rem, 25rem, 80vw);

		&.no-edit:hover {
			cursor: pointer;
			outline: 0.3rem solid var(--clr-accent);
		}

		.name-big {
			@include text-overflow();
			font-size: 2.5rem;
		}
		.name-small {
			@include text-overflow();
			font-size: 1.7rem;
		}

		.details {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;

			.trend-positive {
				color: $green;
			}
			.trend-negative {
				color: $red;
			}
		}
	}
</style>
