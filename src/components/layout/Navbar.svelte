<script lang="ts">
	import activeTimer from '../../stores/activeTimer';
	import Timer from '../elements/Timer.svelte';
	import { MenuIcon, XIcon, PlayIcon, PauseIcon } from 'svelte-feather-icons';
	import { TimerState } from '../../lib/timer';
	import sidebarOpened from '../../stores/sidebarOpened';

	function toggleTimer() {
		activeTimer.updateSelf(x => x.toggle());
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
