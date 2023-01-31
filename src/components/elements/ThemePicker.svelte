<script lang="ts">
	import activeSettings, { Theme } from '@stores/activeSettings';
	import { onMount } from 'svelte';
	import { SunIcon, MoonIcon } from 'svelte-feather-icons';

	onMount(() => {
		// change theme if user prefers light color scheme
		if (window.matchMedia('(prefers-color-scheme: light)').matches)
			activeSettings.updateSelf(s => (s.theme = Theme.Light));
	});

	const toggleTheme = () =>
		activeSettings.updateSelf(
			s => (s.theme = s.theme === Theme.Dark ? Theme.Light : Theme.Dark)
		);
</script>

<button on:click={toggleTheme}>
	{#if $activeSettings.theme === Theme.Light}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</button>
