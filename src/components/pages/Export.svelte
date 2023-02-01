<script lang="ts">
	import activeSession from '@stores/activeSession';
	import BasePage from '@components/pages/BasePage.svelte';
	import HeadedTable from '@components/elements/HeadedTable.svelte';
	import { downloadCsv } from '@lib/util/downloadFile';

	function exportData() {
		downloadCsv($activeSession.run.stats, { filename: 'run.csv' });
	}
</script>

<BasePage>
	<form on:submit|preventDefault={exportData}>
		<figure>
			<figcaption>Export data</figcaption>

			<HeadedTable data={$activeSession.run.stats} />

			<div class="form-controls">
				<button type="submit" class="button">Export</button>
			</div>
		</figure>
	</form>
</BasePage>
