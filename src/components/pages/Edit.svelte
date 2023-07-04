<script lang="ts">
	import activeSession from '@stores/activeSession';
	import FormItem from '@components/elements/FormItem.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import { GridIcon, ListIcon } from 'svelte-feather-icons';
	import EditRunner from '@components/elements/EditRunner.svelte';
	import { _ } from '@lib/util/translations';
	import { link } from 'svelte-spa-router';

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
			<figcaption class="text-2xl font-bold">
				{$_('edit.run_details')}
			</figcaption>
			<FormItem name={$_('edit.round_length')}>
				<input
					type="number"
					bind:value={$activeSession.run.roundLength}
					class="input w-full"
				/>
				<svelte:fragment slot="details">
					{$_('edit.round_length_description')}
				</svelte:fragment>
			</FormItem>
		</figure>
	</form>

	<form on:submit|preventDefault={addRunner}>
		<figure>
			<figcaption class="text-2xl font-bold">
				{$_('edit.add_runner')}
			</figcaption>
			<FormItem name={$_('runner.stats.name')}>
				<input
					type="text"
					required
					bind:value={newRunner.name}
					class="input w-full"
				/>
			</FormItem>
			<FormItem name={$_('runner.stats.alias')}>
				<input
					type="text"
					bind:value={newRunner.alias}
					class="input w-full"
				/>
				<svelte:fragment slot="details">
					{$_('edit.alias_description')}
				</svelte:fragment>
			</FormItem>

			<div class="py-2">
				<button type="submit" class="btn btn-primary">
					{$_('edit.add_runner')}
				</button>
				<a href="/" use:link class="btn">
					{$_('edit.ready')}
				</a>
			</div>
		</figure>
	</form>

	<div class="py-2">
		<button class="btn btn-square" on:click={() => (layoutGrid = true)}>
			<GridIcon size="25" />
		</button>

		<button class="btn btn-square" on:click={() => (layoutGrid = false)}>
			<ListIcon size="25" />
		</button>
	</div>

	<div
		class="flex justify-between gap-2 flex-wrap py-2"
		class:layout-grid={layoutGrid}
		class:flex-col={!layoutGrid}
	>
		{#each $activeSession.run.runners as runner (runner.id)}
			<EditRunner {runner} row={!layoutGrid} />
		{/each}
	</div>
</BasePage>
