<script lang="ts">
	import Runner from '@components/elements/Runner.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import activeSession from '@stores/activeSession';
	import { link } from 'svelte-spa-router';
</script>

<BasePage>
	<div class="runners">
		{#each $activeSession.run.runners as runner}
			<Runner {runner} />
		{:else}
			<p>
				No runners created yet.
				<a href="/edit" use:link>Change it!</a>
			</p>
		{/each}
	</div>
</BasePage>
