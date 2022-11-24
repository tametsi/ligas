<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import activeSession from '@stores/activeSession';
	import FormItem from '@components/elements/FormItem.svelte';
	import type Runner from '@lib/runner';
	import Chart from 'svelte-frappe-charts';

	let selectedRunner: Runner;
	//avoid having an invalid runner (not in run.runners)
	$: selectedRunner = $activeSession.run.runners
		.map(x => x.id)
		.includes(selectedRunner?.id)
		? selectedRunner
		: $activeSession.run.runners[0];
	$: data = {
		labels: selectedRunner?.rounds?.all?.map?.((_, i) => `Round: ${i + 1}`),
		datasets: [
			{
				values: selectedRunner?.rounds?.all?.map?.(v => v / 1000),
			},
		],
	};
</script>

<BasePage page={Page.analytics}>
	{#if $activeSession.run.runners.length != 0}
		<form on:submit|preventDefault>
			<figure>
				<figcaption>Analytics</figcaption>
				<FormItem name="Select Runner">
					<select bind:value={selectedRunner}>
						{#each $activeSession.run.runners as runner}
							<option value={runner}>{runner.name}</option>
						{/each}
					</select>
				</FormItem>
			</figure>
		</form>

		<table class="thin">
			<tbody>
				<tr>
					<td>Name</td>
					<td>{selectedRunner?.name ?? '-'}</td>
				</tr>
				<tr>
					<td>Alias</td>
					<td>{selectedRunner?.alias ?? '-'}</td>
				</tr>
				<tr>
					<td>Rounds</td>
					<td>{selectedRunner?.rounds?.all?.length ?? '-'}</td>
				</tr>
				<tr>
					<td>Distance</td>
					<td>{selectedRunner?.distance ?? '-'}</td>
				</tr>
				<tr>
					<td>Avarage Roundtime</td>
					<td
						>{Math.round(selectedRunner?.rounds?.averageTime ?? 0) /
							1000}s</td
					>
				</tr>
				<tr>
					<td>Fastest Round</td>
					<td
						>{selectedRunner?.rounds?.all.length !== 0
							? Math.min(
									...(selectedRunner?.rounds?.all ?? [0])
							  ) / 1000
							: 0}s</td
					>
				</tr>
				<tr>
					<td>Slowest Round</td>
					<td>
						{selectedRunner?.rounds?.all.length !== 0
							? Math.max(
									...(selectedRunner?.rounds?.all ?? [0])
							  ) / 1000
							: 0}s</td
					>
				</tr>
			</tbody>
		</table>

		<Chart {data} type="line" lineOptions={{ regionFill: 1 }} />
	{:else}
		<article>
			<h2>Analytics</h2>
			<p>No runners available</p>
		</article>
	{/if}
	</BasePage>
