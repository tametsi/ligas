<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<main in:fade={{ duration: 200 }}>
	<slot />
</main>

<style lang="scss">
	main {
		padding: 1rem 2rem;
	}
</style>
