<script lang="ts">
	import Runner from '@components/elements/Runner.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import activeSession from '@stores/activeSession';
	import { link } from 'svelte-spa-router';
	import { _ } from '@lib/util/translations';
</script>

<BasePage>
	<div class="runners">
		{#each $activeSession.run.runners as runner}
			<Runner {runner} />
		{:else}
			<p>
				{$_('main.no_runners')}
				<a href="/edit" use:link>{$_('main.change_it')}</a>
			</p>
		{/each}
	</div>
</BasePage>

<style lang="scss">
	.runners {
		display: flex;
		justify-content: space-around;
		flex-flow: row wrap;
	}
</style>
