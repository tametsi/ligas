<script lang="ts">
	import BasePage from './BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import activeSettings, {
		SessionLoading,
		Theme,
	} from '@stores/activeSettings';
</script>

<BasePage>
	<form on:submit|preventDefault>
		<h2 class="text-2xl font-bold">Settings</h2>

		<FormItem name="Theme">
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
		<FormItem name="Autoload Sessions">
			<div class="btn-group">
				<input
					type="radio"
					data-title="Never"
					value={SessionLoading.Never}
					bind:group={$activeSettings.sessionLoading}
					class="btn"
				/>
				<input
					type="radio"
					data-title="Incomplete"
					value={SessionLoading.IncompleteSessions}
					bind:group={$activeSettings.sessionLoading}
					class="btn"
				/>
				<input
					type="radio"
					data-title="Always"
					value={SessionLoading.Always}
					bind:group={$activeSettings.sessionLoading}
					class="btn"
				/>
			</div>
		</FormItem>
	</form>
</BasePage>
