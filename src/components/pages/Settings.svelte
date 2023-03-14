<script lang="ts">
	import BasePage from './BasePage.svelte';
	import FormItem from '@components/elements/FormItem.svelte';
	import ThemePicker from '@components/elements/ThemePicker.svelte';
	import activeSettings, { SessionLoading } from '@stores/activeSettings';
</script>

<BasePage>
	<form on:submit|preventDefault>
		<h2 class="text-2xl font-bold">Settings</h2>

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
