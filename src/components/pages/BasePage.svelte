<script lang="ts">
	import activePage, { Page } from '../../stores/activePage';

	export let page: Page;
</script>

{#if $activePage === page}
	<main>
		<slot />
	</main>
{/if}
