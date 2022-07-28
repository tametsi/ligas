<script lang="ts">
	import { Page } from '@stores/activePage';
	import BasePage from '@components/pages/BasePage.svelte';
	import Run, { runHistory } from '@lib/run';
	import activeRun from '@stores/activeRun';

	let unique = {};
	function reload() {
		unique = {};
	}
	runHistory.onUpdate = reload;
</script>

<BasePage page={Page.history}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Run History</figcaption>
		</figure>
		{#key unique}
			{#each [...runHistory.getEntries()] as [id, savedRun]}
				<div class="entry">
					<div class="content">
						<pre>{JSON.stringify(savedRun.content, null, 2)}</pre>
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
						on:click={() =>
							($activeRun = Run.fromJSON(savedRun.content))}
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
		{/key}
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
