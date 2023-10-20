<script lang="ts">
	import activeSession from '@stores/activeSession';
	import type Runner from '@lib/runner';
	import RunnerTitle from '@components/elements/RunnerTitle.svelte';
	import { _ } from 'svelte-i18n';

	export let runner: Runner;
	export let row = true;

	const deleteSelf = () => {
		if (confirm($_('edit.delete_prompt')))
			activeSession.updateSelf(session =>
				session.run.deleteRunner(runner.id),
			);
	};
</script>

<div class="card card-compact w-80 bg-base-100" class:w-full={row}>
	<div class="card-body flex-row">
		<RunnerTitle {runner} />

		<div class="flex justify-between gap-2">
			<button on:click={deleteSelf} class="btn btn-sm btn-error">
				{$_('edit.delete')}
			</button>
		</div>
	</div>
</div>
