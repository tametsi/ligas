<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import Session, { sessionHistory } from '@lib/session';
	import activeSession from '@stores/activeSession';
	import Timer from '@lib/timer';
	import formatTime from '@lib/util/formatTime';

	let entries = getSortedEntries();
	function getSortedEntries() {
		return [...sessionHistory.getEntries()].sort(
			(a, b) => b[1].lastChanged - a[1].lastChanged
		);
	}

	function reload() {
		entries = getSortedEntries();
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
