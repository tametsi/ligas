<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<main class="px-8 py-4" in:fade={{ duration: 200 }}>
	<slot />
</main>
