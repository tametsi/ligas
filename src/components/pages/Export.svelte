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
			<figcaption class="text-2xl font-bold">Export data</figcaption>

			<div class="my-2">
				<HeadedTable data={$activeSession.run.stats} />
			</div>

			<div class="my-2">
				<button type="submit" class="btn btn-primary">Export</button>
			</div>
		</figure>
	</form>
</BasePage>
