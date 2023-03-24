<script lang="ts">
	import BasePage from './BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import activeSettings, {
		SessionLoading,
		Theme,
	} from '@stores/activeSettings';
	import { _ } from '@lib/util/translations';
</script>

<BasePage>
	<form on:submit|preventDefault>
		<h2 class="text-2xl font-bold">{$_('settings.title')}</h2>

		<FormItem name={$_('settings.theme')}>
			<div class="btn-group">
				<input
					type="radio"
					data-title="Dark"
					value={Theme.Dark}
					bind:group={$activeSettings.theme}
					class="btn"
				/>
				<input
					type="radio"
					data-title="Light"
					value={Theme.Light}
					bind:group={$activeSettings.theme}
					class="btn"
				/>
				<input
					type="radio"
					data-title="Night"
					value={Theme.Night}
					bind:group={$activeSettings.theme}
					class="btn"
				/>
			</div>
		</FormItem>
		<FormItem name={$_('settings.session_loading.title')}>
			<div class="btn-group">
				<input
					type="radio"
					data-title={$_('settings.session_loading.never')}
					value={SessionLoading.Never}
					bind:group={$activeSettings.sessionLoading}
					class="btn"
				/>
				<input
					type="radio"
					data-title={$_('settings.session_loading.incomplete')}
					value={SessionLoading.IncompleteSessions}
					bind:group={$activeSettings.sessionLoading}
					class="btn"
				/>
				<input
					type="radio"
					data-title={$_('settings.session_loading.always')}
					value={SessionLoading.Always}
					bind:group={$activeSettings.sessionLoading}
					class="btn"
				/>
			</div>
		</FormItem>
	</form>
</BasePage>
