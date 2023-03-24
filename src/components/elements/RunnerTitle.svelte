<script lang="ts">
	import type Runner from '@lib/runner';

	export let runner: Runner;

	let nameBig = runner.alias || runner.name || '';
	let nameSmall = runner.alias ? runner.name : '';
</script>

<p class="card-title items-baseline truncate">
	{nameBig}

	{#if nameSmall}
		<span class="text-lg">({nameSmall})</span>
	{/if}
</p>
