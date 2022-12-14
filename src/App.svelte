<script lang="ts">
	import Pages from '@components/Pages.svelte';
	import Sidebar from '@components/layout/Sidebar.svelte';
	import Navbar from '@components/layout/Navbar.svelte';
	import NewVersionAvailable from '@components/elements/NewVersionAvailable.svelte';
	import sidebarOpened from '@stores/sidebarOpened';
	import activeTheme, { Theme } from '@stores/activeTheme';

	activeTheme.subscribe(x => {
		document.body.classList.forEach(x => {
			if (x.startsWith('theme-')) document.body.classList.remove(x);
		});

		document.body.classList.add(`theme-${Theme[x]}`);
	});
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

	<NewVersionAvailable />
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
			box-shadow: 0px 2px 2px rgba($black, 0.6);
		}
		.sidebar {
			grid-area: side;
			overflow-y: auto;
			box-shadow: 2px 1px 1px var(--clr-accent-transparent);
		}
		.pages {
			grid-area: main;
			height: 100%;
			overflow: auto;
		}
	}
</style>
