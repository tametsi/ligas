<script lang="ts">
	import activeTimer from '../../stores/activeTimer';
	import Timer from '../elements/Timer.svelte';

	function toggleTimer() {
		activeTimer.updateSelf(x => x.toggle());
	}
</script>

<h1>LIGAS</h1>

<button on:click={toggleTimer}>Toggle Timer</button>

<Timer />

<style lang="scss">
	@use '../../scss/abstracts' as a;

	h1 {
		user-select: none;
	}
</style>
