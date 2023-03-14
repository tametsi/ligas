<script lang="ts">
	export let name: string;
</script>

<div class="form-control py-2">
	<div class="label"><span class="label-text font-bold">{name}</span></div>
	<div class="max-w-xl">
		<slot />
	</div>
	{#if $$slots.details}
		<div class="label">
			<span class="label-text">
				<slot name="details" />
			</span>
		</div>
	{/if}
</div>
