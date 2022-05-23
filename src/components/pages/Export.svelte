<script lang="ts">
	import activeRun from '../../stores/activeRun';
	import { Page } from '../../stores/activePage';
	import BasePage from './BasePage.svelte';
	import { downloadCsv } from '../../lib/util/downloadFile';

	function exportData() {
		const header = [
			'Name',
			'Alias',
			'Rounds',
			'Distance (in m)',
			'Max. Difference (in s)',
			'Rounds (Format: mm:ss:ff)',
		];
		const stats = $activeRun.runners.map(runner => runner.stats);

		const data = [header, ...stats];
		downloadCsv(data, { filename: 'run.csv' });
	}
</script>

<BasePage page={Page.export}>
	<form on:submit|preventDefault={exportData}>
		<figure>
			<figcaption>Export data</figcaption>

			<div class="form-controls">
				<button type="submit" class="button">Export</button>
			</div>
		</figure>
	</form>
</BasePage>
