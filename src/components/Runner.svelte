<script lang="ts">
	import type Runner from '../lib/runner';
	import activeRun from '../stores/activeRun';

	export let runner: Runner;
	export let edit = false;

	let nameBig = runner.alias || runner.name || '';
	let nameSmall = runner.alias ? runner.name : '';

	function deleteSelf() {
		if (confirm('Do you really want to delete this runner?'))
			activeRun.updateSelf(x => x.deleteRunner(runner.id));
	}
</script>

<div class="runner">
	<p class="name-big">{nameBig}</p>
	{#if nameSmall}
		<p class="name-small">
			{nameSmall}
		</p>
	{/if}
	<div>
		{#if edit}
			<button on:click={deleteSelf} class="button">Delete</button>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../scss/abstracts' as a;

	.runner {
		display: flex;
		justify-content: space-between;
		flex-flow: column nowrap;

		user-select: none;
		cursor: pointer;

		background-color: var(--clr-bg2);
		border-radius: 0.5rem;
		padding: 1.5rem;
		margin: 1rem;

		width: clamp(20rem, 25rem, 80vw);

		&:hover {
			outline: 0.3rem solid var(--clr-accent);
		}

		.name-big {
			@include a.text-overflow();
			font-size: 2.5rem;
		}
		.name-small {
			@include a.text-overflow();
			font-size: 1.7rem;
		}
	}
</style>
