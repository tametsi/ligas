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

<style lang="scss">
	label {
		.label-name {
			display: inline-block;
			width: clamp(10rem, 20rem, 70%);
		}

		.label-details {
			font-size: 0.7em;
			padding: 0.5rem 0;
		}
	}
</style>
