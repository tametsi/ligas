<script lang="ts">
	import { Page } from '@stores/activePage';
	import activeRun from '@stores/activeRun';
	import Runner from '@components/elements/Runner.svelte';
	import BasePage from '@components/pages/BasePage.svelte';
</script>

<BasePage page={Page.main}>
	<div class="runners">
		{#each $activeRun.runners as runner}
			<Runner {runner} />
		{:else}
			<p>
				No runners created yet.
				<a href="#edit">Change it!</a>
			</p>
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
