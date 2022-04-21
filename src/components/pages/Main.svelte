<script lang="ts">
	import { Page } from '../../stores/activePage';
	import activeRun from '../../stores/activeRun';
	import Runner from '../Runner.svelte';
	import BasePage from './BasePage.svelte';
</script>

<BasePage page={Page.main}>
	<div class="runners">
		{#each $activeRun.runners as runner}
			<Runner {runner} />
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
