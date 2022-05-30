<script lang="ts">
	export let data: unknown[][];

	let maxLength = Math.max(...data.map(x => x.length));
	data.forEach((x, i) => {
		if (i === 0) return; // skip headline

		for (let i = x.length; i < maxLength; i++) x.push('');
	});
</script>

<table>
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
				{#each row as column}
					<td>{column}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
