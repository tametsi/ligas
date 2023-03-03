<script lang="ts">
	import type Runner from '@lib/runner';
	import formatTime from '@lib/util/formatTime';
	import { TimerState } from '@lib/timer';
	import activeSession from '@stores/activeSession';
	import { _ } from '@lib/util/translations';

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
		if (confirm($_('runner.delete_prompt')))
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
				{$_('runner.delete')}
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

		$font-size-name-big: 2.5rem;
		&.row {
			margin: 0.1rem 1rem;

			width: 100%;

			display: grid;
			grid-template-columns: auto 1fr auto;
			grid-template-areas: 'name-big name-small details';
			gap: 1.5rem;

			&:first-of-type {
				margin-top: 1rem;
			}
			&:last-of-type {
				margin-bottom: 1rem;
			}

			.name-small {
				font-size: $font-size-name-big;
				&::before {
					content: '(';
				}
				&::after {
					content: ')';
				}
			}
		}

		.name-big {
			@include text-overflow();
			font-size: $font-size-name-big;

			grid-area: name-big;
		}
		.name-small {
			@include text-overflow();
			font-size: 1.7rem;

			grid-area: name-small;
		}

		.details {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;

			grid-area: details;

			.trend-positive {
				color: $green;
			}
			.trend-negative {
				color: $red;
			}
		}
	}
</style>
