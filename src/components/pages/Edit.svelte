<script lang="ts">
	import { Page } from '../../stores/activePage';
	import activeRun from '../../stores/activeRun';
	import FormItem from '../FormItem.svelte';
	import BasePage from './BasePage.svelte';
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
</BasePage>
