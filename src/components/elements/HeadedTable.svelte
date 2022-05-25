<script lang="ts">
	export let data: unknown[][];
</script>

<table>
	<thead>
		<tr>
			{#each data[0] as header}
				<th>{header}</th>
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
