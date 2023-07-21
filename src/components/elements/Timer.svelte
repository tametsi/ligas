<script lang="ts">
	import formatTime from '@lib/util/formatTime';
	import activeSession from '@stores/activeSession';
	import { _ } from '@lib/util/translations';
	import { PauseIcon, PlayIcon, RotateCcwIcon } from 'svelte-feather-icons';

	$: ({ time, running } = $activeSession.timer);
	const reset = () => {
		if (confirm($_('timer.reset_prompt'))) $activeSession.timer.reset();
	};
</script>

<label class="btn btn-ghost btn-square swap">
	<input type="checkbox" bind:checked={$running} />
	<PauseIcon class="swap-on" />
	<PlayIcon class="swap-off" />
</label>

<p class="px-2 h-12">
	<span class="align-middle font-mono">{formatTime($time)}</span>
</p>

<button on:click={reset} class="btn btn-ghost btn-square">
	<RotateCcwIcon />
</button>
