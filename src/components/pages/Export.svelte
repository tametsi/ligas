<script lang="ts">
	import activeRun from '@stores/activeRun';
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import HeadedTable from '@components/elements/HeadedTable.svelte';
	import { downloadCsv } from '@lib/util/downloadFile';

	function exportData() {
		downloadCsv($activeRun.stats, { filename: 'run.csv' });
	}
</script>

<BasePage page={Page.export}>
	<form on:submit|preventDefault={exportData}>
		<figure>
			<figcaption>Export data</figcaption>

			<HeadedTable data={$activeRun.stats} />

			<div class="form-controls">
				<button type="submit" class="button">Export</button>
			</div>
		</figure>
	</form>
</BasePage>
