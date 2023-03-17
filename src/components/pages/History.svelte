<script lang="ts">
	import BasePage from '@components/pages/BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import { HistorySorting } from '@lib/util/history';
	import Session, { sessionHistory } from '@lib/session';
	import Timer from '@lib/timer';
	import Run from '@lib/run';
	import activeSession from '@stores/activeSession';
	import HistoryEntry from '@components/elements/HistoryEntry.svelte';

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
	<form on:submit|preventDefault class="mb-4">
		<h2 class="text-2xl font-bold">Run History</h2>

		<FormItem name="Sort By">
			<select
				bind:value={currentSorting}
				on:change={reload}
				class="select w-96 max-w-full"
			>
				<option value={HistorySorting.ModificationDescending}>
					Modification Date: Newest to oldest
				</option>
				<option value={HistorySorting.ModificationAscending}>
					Modification Date: Oldest to newest
				</option>
				<option value={HistorySorting.CreationDescending}>
					Creation Date: Newest to oldest
				</option>
				<option value={HistorySorting.CreationAscending}>
					Creation Date: Oldest to newest
				</option>
			</select>
		</FormItem>

		<FormItem name="Exclude Empty Sessions">
			<input
				type="checkbox"
				bind:checked={excludeEmptySessions}
				class="checkbox"
			/>
			<svelte:fragment slot="details">
				Empty sessions are sessions without runners.
			</svelte:fragment>
		</FormItem>
		<button
			class="btn btn-primary"
			on:click={() => {
				$activeSession.save();
				$activeSession = new Session(new Timer(), new Run());
			}}
		>
			New Run
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
			No history entries created yet, but your current progress will be
			automatically saved when you leave the page.
		</p>
	{/each}
</BasePage>
