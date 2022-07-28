<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import Run, { runHistory } from '@lib/run';
	import activeRun from '@stores/activeRun';

	let entries = getSortedEntries();

	function getSortedEntries() {
		return [...runHistory.getEntries()].sort(
			(a, b) => b[1].lastChanged - a[1].lastChanged
		);
	}

	function reload() {
		entries = getSortedEntries();
	}
	runHistory.onUpdate = reload;
</script>

<BasePage page={Page.history}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Run History</figcaption>
		</figure>
		{#each entries as [id, savedRun]}
			<div class="entry">
				<div class="content">
					<div class="run">
						<p>Runners:</p>
						<div class="runners">
							{#each savedRun.content.runners as runner}
								<div class="runner">
									<p>Name: {runner.name}</p>
									<p>Alias: {runner.alias}</p>
									<p>
										Rounds: {runner.rounds.rounds.length}
									</p>
								</div>
							{:else}
								<p class="runner">None</p>
							{/each}
						</div>
						<p>Round Length: {savedRun.content.roundLength}</p>
					</div>
					<div class="dates">
						<p>
							Created: {new Date(
								savedRun.created
							).toLocaleString()}
						</p>
						<p>
							Last modified: {new Date(
								savedRun.lastChanged
							).toLocaleString()}
						</p>
					</div>
				</div>

				<button
					on:click={() => {
						$activeRun = Run.fromJSON(savedRun.content);
						reload();
					}}
					class="button small">Load</button
				>
				<button
					on:click={() => {
						runHistory.removeEntry(id);
						reload();
					}}
					class="button small warning">Delete</button
				>
			</div>
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

			.run {
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
