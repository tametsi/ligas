<script lang="ts">
	import activeTheme, { Theme } from '@stores/activeTheme';
	import { onMount } from 'svelte';
	import { SunIcon, MoonIcon } from 'svelte-feather-icons';

	onMount(() => {
		// change theme if user prefers light color scheme
		if (window.matchMedia('(prefers-color-scheme: light)').matches)
			$activeTheme = Theme.light;
	});

	const toggleTheme = () =>
		activeTheme.update(x => (x === Theme.dark ? Theme.light : Theme.dark));
</script>

<button on:click={toggleTheme}>
	{#if $activeTheme === Theme.light}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</button>
