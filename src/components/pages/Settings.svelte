<script lang="ts">
	import BasePage from './BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import ThemePicker from '@components/elements/ThemePicker.svelte';
	import activeSettings, { SessionLoading } from '@stores/activeSettings';
	import { _, locale, getLocaleFromNavigator } from '@lib/util/translations';
</script>

<BasePage>
	<form on:submit|preventDefault>
		<figure>
			<figcaption>{$_('settings.title')}</figcaption>

			<FormItem name={$_('settings.theme')}>
				<ThemePicker />
			</FormItem>
			<FormItem name={$_('settings.session_loading.title')}>
				<select bind:value={$activeSettings.sessionLoading}>
					<option value={SessionLoading.Never}>
						{$_('settings.session_loading.never')}
					</option>
					<option value={SessionLoading.IncompleteSessions}>
						{$_('settings.session_loading.incomplete')}
					</option>
					<option value={SessionLoading.Always}>
						{$_('settings.session_loading.always')}
					</option>
				</select>
			</FormItem>
			<FormItem name={$_('settings.language')}>
				<select bind:value={$locale}>
					<option value={getLocaleFromNavigator()}> Auto </option>
					<option value="de"> Deutsch </option>
					<option value="en"> English </option>
				</select>
			</FormItem>
		</figure>
	</form>
</BasePage>
