<script lang="ts">
	import { MenuIcon, XIcon, PlayIcon, PauseIcon } from 'svelte-feather-icons';
	import Timer from '@components/elements/Timer.svelte';
	import { TimerState } from '@lib/timer';
	import activeSession from '@stores/activeSession';
	import sidebarOpened from '@stores/sidebarOpened';

	function toggleTimer() {
		activeSession.updateSelf(session => session.timer.toggle());
	}

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
		<button on:click={toggleTimer}>
			{#if $activeSession.timer.state === TimerState.running}
				<PauseIcon />
			{:else}
				<PlayIcon />
			{/if}
		</button>
		<Timer />
	</div>
</div>

<style lang="scss">
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
