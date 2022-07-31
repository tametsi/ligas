<script lang="ts">
	import activeTheme, { Theme } from '@stores/activeTheme';
	import { SunIcon, MoonIcon } from 'svelte-feather-icons';

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
