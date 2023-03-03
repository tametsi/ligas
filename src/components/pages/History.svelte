<script lang="ts">
	import BasePage from '@components/pages/BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import { HistorySorting } from '@lib/util/history';
	import Session, { sessionHistory } from '@lib/session';
	import Timer from '@lib/timer';
	import Run from '@lib/run';
	import activeSession from '@stores/activeSession';
	import HistoryEntry from '@components/elements/HistoryEntry.svelte';
	import { _ } from '@lib/util/translations';

	let currentSorting = HistorySorting.ModificationDescending;
	let excludeEmptySessions = true;
	let entries = sessionHistory
		.getEntriesSorted(currentSorting)
		.filter(x => x[0] !== $activeSession.id);

	function reload() {
		entries = sessionHistory
			.getEntriesSorted(currentSorting)
			.filter(x => x[0] !== $activeSession.id);
	}
	sessionHistory.onUpdate = reload;
</script>

<BasePage>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>{$_('history.title')}</figcaption>
		</figure>
		<FormItem name={$_('history.sorting.title')}>
			<select bind:value={currentSorting} on:change={reload}>
				<option value={HistorySorting.ModificationDescending}>
					{$_('history.sorting.modification_descending')}
				</option>
				<option value={HistorySorting.ModificationAscending}>
					{$_('history.sorting.modification_ascending')}
				</option>
				<option value={HistorySorting.CreationDescending}>
					{$_('history.sorting.creation_descending')}
				</option>
				<option value={HistorySorting.CreationAscending}>
					{$_('history.sorting.creation_ascending')}
				</option>
			</select>
		</FormItem>

		<FormItem name={$_('history.empty_sessions')}>
			<input type="checkbox" bind:checked={excludeEmptySessions} />
			<svelte:fragment slot="details">
				{$_('history.empty_sessions_description')}
			</svelte:fragment>
		</FormItem>
		<button
			class="button"
			on:click={() => {
				$activeSession.save();
				$activeSession = new Session(new Timer(), new Run());
			}}
			>{$_('history.new_run')}
		</button>
	</form>

	{#each entries as [id, { content: session, content: { timer, run }, created, lastChanged }]}
		{#if !(excludeEmptySessions && run.runners.length === 0)}
			<HistoryEntry
				{id}
				{session}
				{timer}
				{run}
				{created}
				{lastChanged}
			/>
		{/if}
	{:else}
		<p>
			{$_('history.no_entries')}
		</p>
	{/each}
</BasePage>

<style lang="scss">
	select,
	option {
		padding: 0.5rem;
	}
</style>
