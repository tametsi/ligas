<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<main in:fade={{ duration: 200 }}>
	<slot />
</main>
