<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import { HistorySorting } from '@lib/util/history';
	import Session, { sessionHistory } from '@lib/session';
	import activeSession from '@stores/activeSession';
	import Timer from '@lib/timer';
	import formatTime from '@lib/util/formatTime';

	let currentSorting = HistorySorting.ModificationDescending;
	let entries = [...sessionHistory.getEntriesSorted(currentSorting)];

	function reload() {
		entries = [...sessionHistory.getEntriesSorted(currentSorting)];
	}
	sessionHistory.onUpdate = reload;

	function loadSession(
		id: string,
		savedSession: ReturnType<Session['toJSON']>,
		copy = false
	) {
		if (
			confirm(
				`Do you really want to ${
					copy ? 'copy' : 'load'
				} that session? Your current session will be lost!`
			)
		) {
			$activeSession.delete();
			const session = Session.fromJSON(savedSession, id);
			$activeSession = copy ? session.clone() : session;
		}
	}

	function deleteSession(id: string) {
		if (confirm('Do you really want to delete this session?'))
			sessionHistory.removeEntry(id);
	}
</script>

<BasePage page={Page.history}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Run History</figcaption>
		</figure>
		<FormItem name="Sort By">
			<select bind:value={currentSorting} on:change={reload}>
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
		{#each entries as [id, { content: session, content: { timer, run }, created, lastChanged }]}
			{#if id !== $activeSession.id}
				<div class="entry">
					<div class="content">
						<div class="session">
							<p>
								Time: {formatTime(
									Timer.fromJSON(timer).getRunDuration()
								)}
							</p>

							<p>Runners:</p>
							<div class="runners">
								{#each run.runners as runner}
									<div class="runner">
										<p>Name: {runner.name}</p>
										<p>Alias: {runner.alias}</p>
										<p>
											Rounds: {runner.rounds.rounds
												.length}
										</p>
									</div>
								{:else}
									<p class="runner">None</p>
								{/each}
							</div>

							<p>
								Round Length: {run.roundLength}
							</p>
						</div>

						<div class="dates">
							<p>
								Last modified: {new Date(
									lastChanged
								).toLocaleString()}
							</p>
							<p>
								Created: {new Date(created).toLocaleString()}
							</p>
						</div>
					</div>

					<br />

					<button
						on:click={() => loadSession(id, session)}
						class="button small">Load</button
					>
					<button
						on:click={() => loadSession(id, session, true)}
						class="button small">Copy</button
					>
					<button
						on:click={() => deleteSession(id)}
						class="button small warning">Delete</button
					>
				</div>
			{/if}
		{:else}
			<p>
				No history entries created yet, but your current progress will
				be automatically saved when you leave the page.
			</p>
		{/each}
	</form>
</BasePage>

<style lang="scss">
	select,
	option {
		padding: 0.5rem;
	}

	.entry {
		user-select: none;
		cursor: default;

		background-color: var(--clr-bg2);
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin: 1rem;

		.content {
			display: flex;
			justify-content: space-between;

			.session {
				.runners {
					display: flex;
					flex-wrap: wrap;

					.runner {
						padding: 1rem;
						margin: 0.5rem;
						border-radius: 0.5rem;
						box-shadow: inset 0 0 1em #00000050;
					}
				}
			}

			.dates {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				p {
					font-size: 1.2em;
				}
			}
		}
	}
</style>
