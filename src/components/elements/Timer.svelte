<script lang="ts">
	import formatTime from '@lib/util/formatTime';
	import activeSession from '@stores/activeSession';
	import { _ } from '@lib/util/translations';
	import { PauseIcon, PlayIcon, RotateCcwIcon } from 'svelte-feather-icons';

	$: running = $activeSession.timer.running;
	$: time = $activeSession.timer.remaining;
	const reset = () =>
		activeSession.updateSelf(x => {
			if (confirm($_('timer.reset_prompt'))) $activeSession.timer.reset();
		});
</script>

<button
	on:click={() => $activeSession.timer.toggle()}
	class="btn btn-ghost btn-square"
>
	<svelte:component this={running ? PauseIcon : PlayIcon} />
</button>

<p class="px-2 h-12">
	<span class="align-middle font-mono">{formatTime($time)}</span>
</p>

<button on:click={reset} class="btn btn-ghost btn-square">
	<RotateCcwIcon />
</button>
