<script lang="ts">
	import FormItem from '@components/elements/FormItem.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import type Runner from '@lib/runner';
	import activeSession from '@stores/activeSession';
	import Chart from 'svelte-frappe-charts';
	import { link } from 'svelte-spa-router';
	import { _ } from '@lib/util/translations';

	let selectedRunner: Runner;
	//avoid having an invalid runner (not in run.runners)
	$: selectedRunner = $activeSession.run.runners
		.map(x => x.id)
		.includes(selectedRunner?.id)
		? selectedRunner
		: $activeSession.run.runners[0];
	$: data = {
		labels: selectedRunner?.rounds.all.map(
			(_v, i) => `${$_('analytics.round')}: ${i + 1}`
		),
		datasets: [
			{
				values: selectedRunner?.rounds.all.map(v => v / 1000),
			},
		],
	};
</script>

<BasePage>
	<h2 class="text-2xl font-bold">{$_('analytics.title')}</h2>

	{#if $activeSession.run.runners.length != 0}
		<form on:submit|preventDefault>
			<FormItem name={$_('analytics.select_runner')}>
				<select bind:value={selectedRunner} class="select">
					{#each $activeSession.run.runners as runner}
						<option value={runner}>{runner.name}</option>
					{/each}
				</select>
			</FormItem>
		</form>

		<div class="bg-base-100 w-fit rounded-btn">
			<table class="table table-zebra table-sm w-auto">
				<tbody>
					<tr>
						<td>{$_('runner.stats.name')}</td>
						<td>{selectedRunner?.name ?? '-'}</td>
					</tr>
					<tr>
						<td>{$_('runner.stats.alias')}</td>
						<td>{selectedRunner?.alias ?? '-'}</td>
					</tr>
					<tr>
						<td>{$_('runner.stats.rounds')}</td>
						<td>{selectedRunner?.rounds.count ?? '-'}</td>
					</tr>
					<tr>
						<td>{$_('runner.stats.distance')}</td>
						<td>{selectedRunner?.distance ?? '-'}</td>
					</tr>
					<tr>
						<td>{$_('runner.stats.average_roundtime')}</td>
						<td
							>{Math.round(
								selectedRunner?.rounds.averageTime ?? 0
							) / 1000}s</td
						>
					</tr>
					<tr>
						<td>{$_('runner.stats.fastest_round')}</td>
						<td
							>{selectedRunner?.rounds.count !== 0
								? Math.min(
										...(selectedRunner?.rounds.all ?? [0])
								  ) / 1000
								: 0}s</td
						>
					</tr>
					<tr>
						<td>{$_('runner.stats.slowest_round')}</td>
						<td>
							{selectedRunner?.rounds.count !== 0
								? Math.max(
										...(selectedRunner?.rounds.all ?? [0])
								  ) / 1000
								: 0}s</td
						>
					</tr>
				</tbody>
			</table>
		</div>

		<Chart {data} type="line" lineOptions={{ regionFill: 1 }} />
	{:else}
		<p>
			{$_('main.no_runners')}
			<a href="/edit" use:link class="link link-hover link-primary">
				{$_('main.change_it')}
			</a>
		</p>
	{/if}
</BasePage>
