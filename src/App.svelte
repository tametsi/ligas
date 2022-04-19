<script lang="ts">
	import Pages from './components/Pages.svelte';
	import Sidebar from './components/Sidebar.svelte';
</script>

<div class="wrapper">
	<aside class="sidebar">
		<Sidebar />
	</aside>

	<div class="pages">
		<Pages />
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-areas:
			'side main';
		grid-template-columns: clamp(50px, 18rem, 10%) 1fr;
		grid-template-rows: 1fr;

		height: 100vh;
		overflow-y: hidden;

		.sidebar {
			grid-area: side;
			overflow-y: auto;
		}
		.pages {
			grid-area: main;
		}
	}
</style>
