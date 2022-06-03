<script lang="ts">
	import activeTimer from '../../stores/activeTimer';
	import Timer from '../elements/Timer.svelte';
	import { PlayIcon, PauseIcon } from 'svelte-feather-icons';
	import { TimerState } from '../../lib/timer';

	function toggleTimer() {
		activeTimer.updateSelf(x => x.toggle());
	}
</script>

<div class="wrapper">
	<h1>LIGAS</h1>

	<div class="timer">
		<button on:click={toggleTimer}>
			{#if $activeTimer.state === TimerState.running}
				<PauseIcon />
			{:else}
				<PlayIcon />
			{/if}
		</button>
		<Timer />
	</div>
</div>

<style lang="scss">
	@use '../../scss/abstracts' as a;

	.wrapper {
		display: flex;
		justify-content: space-between;

		background-color: var(--clr-bg2);

		padding: 0.2rem 1rem;

		h1,
		.timer {
			font-size: 3rem;
			user-select: none;
		}
	}
</style>
