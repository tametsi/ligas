<script lang="ts">
	import Timer from '@components/elements/Timer.svelte';
	import { TimerState } from '@lib/timer';
	import activeSession from '@stores/activeSession';
	import { Menu, Pause, Play, RotateCcw } from 'lucide-svelte';
	import { _ } from '@lib/util/translations';

	const pauseTimer = () => activeSession.updateSelf(x => x.timer.pause());
	const resetTimer = () =>
		activeSession.updateSelf(x => {
			if (confirm($_('timer.reset_prompt'))) x.timer.reset();
		});
</script>

<nav class="navbar sticky top-0 z-10 bg-base-300 text-3xl text-justify">
	<!-- navbar content -->
	<div class="navbar-start">
		<label for="drawer-toggle" class="btn btn-ghost btn-square lg:hidden">
			<Menu />
		</label>
	</div>

	<h1 class="navbar-center h-12 hidden md:flex">LIGAS</h1>

	<div class="navbar-end">
		<button on:click={pauseTimer} class="btn btn-ghost btn-square">
			{#if $activeSession.timer.state === TimerState.Running}
				<Pause />
			{:else}
				<Play />
			{/if}
		</button>
		<p class="px-2 h-12 font-mono leading-[3rem]">
			<Timer />
		</p>
		<button on:click={resetTimer} class="btn btn-ghost btn-square">
			<RotateCcw />
		</button>
	</div>
</nav>
