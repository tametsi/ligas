<script lang="ts">
	export let name: string;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label>
	<div class="label-name">{name}</div>
	<slot />
	<p class="label-details">
		<slot name="details" />
	</p>
</label>
