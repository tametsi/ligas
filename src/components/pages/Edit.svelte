<script lang="ts">
	import { Page } from '../../stores/activePage';
	import activeRun from '../../stores/activeRun';
	import FormItem from '../elements/FormItem.svelte';
	import Runner from '../elements/Runner.svelte';
	import BasePage from './BasePage.svelte';

	let newRunner = {
		name: '',
		alias: '',
	};

	function addRunner() {
		activeRun.updateSelf(x => x.addRunner(newRunner.name, newRunner.alias));
	}
</script>

<BasePage page={Page.edit}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Run Details</figcaption>
			<FormItem name="Round Length">
				<input type="number" bind:value={$activeRun.roundLength} />
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

	<div class="runners">
		{#each $activeRun.runners as runner}
			<Runner {runner} edit />
		{/each}
	</div>
</BasePage>

<style lang="scss">
	.runners {
		display: flex;
		justify-content: space-around;
		flex-flow: row wrap;
	}
</style>
