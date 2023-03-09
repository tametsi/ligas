<script lang="ts">
	import Timer from '@components/elements/Timer.svelte';
	import { TimerState } from '@lib/timer';
	import activeSession from '@stores/activeSession';
	import sidebarOpened from '@stores/sidebarOpened';
	import {
		MenuIcon,
		PauseIcon,
		PlayIcon,
		RotateCcwIcon,
		XIcon,
	} from 'svelte-feather-icons';

	const pauseTimer = () => activeSession.updateSelf(x => x.timer.pause());
	const resetTimer = () => activeSession.updateSelf(x => x.timer.reset());
	function toggleSidebar() {
		$sidebarOpened = !$sidebarOpened;
	}
</script>

<div class="wrapper">
	<button on:click={toggleSidebar}>
		{#if $sidebarOpened}
			<XIcon />
		{:else}
			<MenuIcon />
		{/if}
	</button>

	<h1>LIGAS</h1>

	<div class="timer">
		<button on:click={pauseTimer}>
			{#if $activeSession.timer.state === TimerState.Running}
				<PauseIcon />
			{:else}
				<PlayIcon />
			{/if}
		</button>
		<button on:click={resetTimer}>
			<RotateCcwIcon />
		</button>
		<Timer />
	</div>
</div>
