<script lang="ts">
	import MainRunner from '@components/elements/MainRunner.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import activeSession from '@stores/activeSession';
	import { link } from 'svelte-spa-router';
</script>

<BasePage>
	<div class="flex justify-around gap-2 flex-wrap">
		{#each $activeSession.run.runners as runner}
			<MainRunner {runner} />
		{:else}
			<p>
				No runners created yet.
				<a href="/edit" use:link class="link link-hover link-primary"
					>Change it!</a
				>
			</p>
		{/each}
	</div>
</BasePage>
