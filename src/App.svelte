<script lang="ts">
	import Pages from './components/Pages.svelte';
	import Sidebar from './components/layout/Sidebar.svelte';
	import Navbar from './components/layout/Navbar.svelte';
	import sidebarOpened from './stores/sidebarOpened';
</script>

<div class="wrapper" class:sidebar-closed={!$sidebarOpened}>
	<nav class="navbar">
		<Navbar />
	</nav>

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
			'nav nav'
			'side main';
		grid-template-columns: clamp(50px, 18rem, 10%) 1fr;
		grid-template-rows: auto 1fr;

		height: 100vh;
		overflow-y: hidden;

		transition: grid-template-columns 0.2s;
		&.sidebar-closed {
			grid-template-columns: 0 1fr;
		}

		.navbar {
			grid-area: nav;
		}
		.sidebar {
			grid-area: side;
			overflow-y: auto;
		}
		.pages {
			grid-area: main;
			height: 100%;
			overflow: auto;
		}
	}
</style>
