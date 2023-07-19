<script lang="ts">
	import MainRunner from '@components/elements/MainRunner.svelte';
	import RunnerSortingPicker from '@components/elements/RunnerSortingPicker.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import activeSettings from '@stores/activeSettings';
	import activeSession from '@stores/activeSession';
	import { link } from 'svelte-spa-router';
	import { _ } from '@lib/util/translations';
</script>

<BasePage>
	<div class="pb-4">
		<RunnerSortingPicker small />
	</div>

	<div class="flex justify-around gap-2 flex-wrap">
		{#key $activeSettings.runnerSorting + $activeSettings.runnerSortingKey}
			{#each $activeSession.run.runnersSorted as runner}
				<MainRunner {runner} />
			{:else}
				<p>
					{$_('main.no_runners')}
					<a
						href="/edit"
						use:link
						class="link link-hover link-primary"
						>{$_('main.change_it')}</a
					>
				</p>
			{/each}
		{/key}
	</div>
</BasePage>
