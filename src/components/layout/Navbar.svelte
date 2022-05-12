<script lang="ts">
	import activeTimer from '../../stores/activeTimer';
	import Timer from '../elements/Timer.svelte';

	function toggleTimer() {
		activeTimer.updateSelf(x => x.toggle());
	}
</script>

<div class="wrapper">
	<h1>LIGAS</h1>

	<div class="timer">
		<button on:click={toggleTimer}>Toggle Timer</button>
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
