<script lang="ts">
	import { Page } from '../../stores/activePage';
	import BasePage from './BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import ThemePicker from '@components/elements/ThemePicker.svelte';
</script>

<BasePage page={Page.settings}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Settings</figcaption>

			<FormItem name="Theme">
				<ThemePicker />
			</FormItem>
		</figure>
	</form>
</BasePage>
