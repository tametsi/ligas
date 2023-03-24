<script lang="ts">
	import type Runner from '@lib/runner';
	import activeSession from '@stores/activeSession';
	import RunnerTitle from './RunnerTitle.svelte';

	export let runner: Runner;
	export let row = true;

	function deleteSelf() {
		if (confirm('Do you really want to delete this runner?'))
			activeSession.updateSelf(session =>
				session.run.deleteRunner(runner.id)
			);
	}
</script>

<div class="card card-compact w-80 bg-base-100" class:w-full={row}>
	<div class="card-body flex-row">
		<RunnerTitle {runner} />

		<div class="flex justify-between gap-2">
			<button on:click={deleteSelf} class="btn btn-sm btn-error">
				Delete
			</button>
		</div>
	</div>
</div>
