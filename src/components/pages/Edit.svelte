<script lang="ts">
	import activeSession from '@stores/activeSession';
	import FormItem from '@components/elements/FormItem.svelte';
	import Runner from '@components/elements/Runner.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import { GridIcon, ListIcon } from 'svelte-feather-icons';
	import { _ } from '@lib/util/translations';

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

<BasePage>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>{$_('edit.run_details')}</figcaption>
			<FormItem name={$_('edit.round_length')}>
				<input
					type="number"
					bind:value={$activeSession.run.roundLength}
				/>
				<svelte:fragment slot="details">
					{$_('edit.round_length_description')}
				</svelte:fragment>
			</FormItem>
		</figure>
	</form>

	<form on:submit|preventDefault={addRunner}>
		<figure>
			<figcaption>{$_('edit.add_runner')}</figcaption>
			<FormItem name={$_('runner.stats.name')}>
				<input type="text" required bind:value={newRunner.name} />
			</FormItem>
			<FormItem name={$_('runner.stats.alias')}>
				<input type="text" bind:value={newRunner.alias} />
				<svelte:fragment slot="details">
					{$_('edit.alias_description')}
				</svelte:fragment>
			</FormItem>

			<div class="form-controls">
				<button type="submit" class="button"
					>{$_('edit.add_runner')}</button
				>
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
		{#each $activeSession.run.runners as runner (runner.id)}
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
