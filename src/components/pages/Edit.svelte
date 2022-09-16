<script lang="ts">
	import { Page } from '@stores/activePage';
	import activeSession from '@stores/activeSession';
	import FormItem from '@components/elements/FormItem.svelte';
	import Runner from '@components/elements/Runner.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import { GridIcon, ListIcon } from 'svelte-feather-icons';

	let layoutGrid = true;
	let newRunner = {
		name: '',
		alias: '',
	};

	function addRunner() {
		activeSession.updateSelf(session =>
			session.run.addRunner(newRunner.name, newRunner.alias)
		);
	}
</script>

<BasePage page={Page.edit}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Run Details</figcaption>
			<FormItem name="Round Length">
				<input
					type="number"
					bind:value={$activeSession.run.roundLength}
				/>
				<svelte:fragment slot="details">
					Specify the length of a single round to give LIGAS the
					possibility to calculate the complete route length the
					runners passed.
				</svelte:fragment>
			</FormItem>
		</figure>
	</form>

	<form on:submit|preventDefault={addRunner}>
		<figure>
			<figcaption>Add Runner</figcaption>
			<FormItem name="Name">
				<input type="text" required bind:value={newRunner.name} />
			</FormItem>
			<FormItem name="Alias">
				<input type="text" bind:value={newRunner.alias} />
				<svelte:fragment slot="details">
					The alias will be shown if provided. The name can also be
					seen. Both, the name and the alias are listed in the round
					data.
				</svelte:fragment>
			</FormItem>

			<div class="form-controls">
				<button type="submit" class="button">Add Runner</button>
			</div>
		</figure>
	</form>

	<div class="runner-layout">
		<button class="button-icon" on:click={() => (layoutGrid = true)}>
			<GridIcon size="25" />
		</button>

		<button class="button-icon" on:click={() => (layoutGrid = false)}>
			<ListIcon size="25" />
		</button>
	</div>

	<div
		class="runners"
		class:layout-grid={layoutGrid}
		class:layout-list={!layoutGrid}
	>
		{#each $activeSession.run.runners as runner}
			<Runner {runner} edit row={!layoutGrid} />
		{/each}
	</div>
</BasePage>

<style lang="scss">
	.runners {
		display: flex;
		justify-content: space-around;

		&.layout-grid {
			flex-flow: row wrap;
		}
		&.layout-list {
			flex-flow: column nowrap;
		}
	}
</style>
