<script lang="ts">
	export let data: unknown[][];

	let maxLength = Math.max(...data.map(x => x.length));
	$: data.forEach((x, i) => {
		if (i === 0) return; // skip headline

		for (let i = x.length; i < maxLength; i++) x.push('');
	});
</script>

<div class="overflow-x-auto rounded-btn bg-base-100">
	<table class="table table-zebra table-sm">
		<thead>
			<tr>
				{#each data[0] as header, i}
					<th colspan={data[0].length - 1 <= i ? maxLength - i : 1}>
						{header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data.splice(1) as row}
				<tr>
					{#each row as column, i}
						{#if i === 0}
							<th>{column}</th>
						{:else}
							<td>{column}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
