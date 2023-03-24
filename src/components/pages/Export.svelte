<script lang="ts">
	import activeSession from '@stores/activeSession';
	import BasePage from '@components/pages/BasePage.svelte';
	import HeadedTable from '@components/elements/HeadedTable.svelte';
	import { downloadCsv } from '@lib/util/downloadFile';
	import { _ } from '@lib/util/translations';

	function exportData() {
		downloadCsv($activeSession.run.stats, { filename: 'run.csv' });
	}
</script>

<BasePage>
	<form on:submit|preventDefault={exportData}>
		<figure>
			<figcaption class="text-2xl font-bold">{$_('export.title')}</figcaption>

			<div class="my-2">
				<HeadedTable data={$activeSession.run.stats} />
			</div>

			<div class="my-2">
				<button type="submit" class="btn btn-primary">
					{$_('export.title')}
				</button>
			</div>
		</figure>
	</form>
</BasePage>
