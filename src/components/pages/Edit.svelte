<script lang="ts">
	import activeSession from '@stores/activeSession';
	import FormItem from '@components/elements/FormItem.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
	import { GridIcon, ListIcon } from 'svelte-feather-icons';
	import EditRunner from '@components/elements/EditRunner.svelte';

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
	<form on:submit|preventDefault class="">
		<figure>
			<figcaption class="text-2xl font-bold">Run Details</figcaption>
			<FormItem name="Round Length">
				<input
					type="number"
					bind:value={$activeSession.run.roundLength}
					class="input w-full"
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
			<figcaption class="text-2xl font-bold">Add Runner</figcaption>
			<FormItem name="Name">
				<input
					type="text"
					required
					bind:value={newRunner.name}
					class="input w-full"
				/>
			</FormItem>
			<FormItem name="Alias">
				<input
					type="text"
					bind:value={newRunner.alias}
					class="input w-full"
				/>
				<svelte:fragment slot="details">
					The alias will be shown if provided. The name can also be
					seen. Both, the name and the alias are listed in the round
					data.
				</svelte:fragment>
			</FormItem>

			<div class="py-2">
				<button type="submit" class="btn btn-primary">Add Runner</button
				>
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
