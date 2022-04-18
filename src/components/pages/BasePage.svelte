<script lang="ts">
	import { fade } from 'svelte/transition';
	import activePage, { Page } from '../../stores/activePage';

	export let page: Page;
</script>

{#if $activePage === page}
	<main in:fade={{ duration: 200 }}>
		<slot />
	</main>
{/if}
