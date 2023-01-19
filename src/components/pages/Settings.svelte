<script lang="ts">
	import { Page } from '../../stores/activePage';
	import BasePage from './BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import ThemePicker from '@components/elements/ThemePicker.svelte';
	import activeSettings, { SessionLoading } from '@stores/activeSettings';
</script>

<BasePage page={Page.settings}>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>Settings</figcaption>

			<FormItem name="Theme">
				<ThemePicker />
			</FormItem>
			<FormItem name="Autoload Sessions">
				<select bind:value={$activeSettings.sessionLoading}>
					<option value={SessionLoading.Never}>Never</option>
					<option value={SessionLoading.IncompleteSessions}
						>Incomplete</option
					>
					<option value={SessionLoading.Always}>Always</option>
				</select>
			</FormItem>
		</figure>
	</form>
</BasePage>
