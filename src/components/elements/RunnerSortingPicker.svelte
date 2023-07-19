<script lang="ts">
	import activeSettings, {
		RunnerSorting,
		RunnerSortingKey,
	} from '@stores/activeSettings';
	import { _ } from '@lib/util/translations';
	import { ArrowDownAZ, ArrowUpAZ, CircleSlash } from 'lucide-svelte';

	export let small = false;
</script>

<div class="flex gap-2">
	<div class="join">
		<button
			type="button"
			class="join-item btn btn-square"
			class:btn-sm={small}
			class:btn-primary={$activeSettings.runnerSorting ===
				RunnerSorting.None}
			on:click={() =>
				($activeSettings.runnerSorting = RunnerSorting.None)}
		>
			<CircleSlash size={small ? 18 : 25} />
		</button>
		<button
			class="join-item btn btn-square"
			class:btn-sm={small}
			class:btn-primary={$activeSettings.runnerSorting ===
				RunnerSorting.Asc}
			on:click={() => ($activeSettings.runnerSorting = RunnerSorting.Asc)}
		>
			<ArrowDownAZ size={small ? 18 : 25} />
		</button>
		<button
			class="join-item btn btn-square"
			class:btn-sm={small}
			class:btn-primary={$activeSettings.runnerSorting ===
				RunnerSorting.Des}
			on:click={() => ($activeSettings.runnerSorting = RunnerSorting.Des)}
		>
			<ArrowUpAZ size={small ? 18 : 25} />
		</button>
	</div>

	<div class="join">
		<input
			type="radio"
			aria-label={$_('settings.runner_sorting.name')}
			value={RunnerSortingKey.Name}
			bind:group={$activeSettings.runnerSortingKey}
			class="join-item btn"
			class:btn-sm={small}
		/>
		<input
			type="radio"
			aria-label={$_('settings.runner_sorting.alias')}
			value={RunnerSortingKey.Alias}
			bind:group={$activeSettings.runnerSortingKey}
			class="join-item btn"
			class:btn-sm={small}
		/>
	</div>
</div>
