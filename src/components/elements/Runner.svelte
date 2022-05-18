<script lang="ts">
	import type Runner from '../../lib/runner';
	import formatTime from '../../lib/util/formatTime';
	import { TimerState } from '../../lib/timer';
	import activeTimer from '../../stores/activeTimer';
	import activeRun from '../../stores/activeRun';

	export let runner: Runner;
	export let edit = false;

	let nameBig = runner.alias || runner.name || '';
	let nameSmall = runner.alias ? runner.name : '';
	let roundsCounted: number;
	let lastRoundLength: string;

	function update() {
		roundsCounted = runner.rounds.count;
		lastRoundLength = formatTime(runner.rounds.last);
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
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../scss/abstracts' as a;

	.runner {
		display: flex;
		justify-content: space-between;
		flex-flow: column nowrap;

		user-select: none;
		cursor: pointer;

		background-color: var(--clr-bg2);
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin: 1rem;

		width: clamp(20rem, 25rem, 80vw);

		&.no-edit:hover {
			outline: 0.3rem solid var(--clr-accent);
		}

		.name-big {
			@include a.text-overflow();
			font-size: 2.5rem;
		}
		.name-small {
			@include a.text-overflow();
			font-size: 1.7rem;
		}

		.details {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;
		}
	}
</style>
