<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import Navbar from '@components/layout/Navbar.svelte';
	import NewVersionAvailable from '@components/elements/NewVersionAvailable.svelte';
	import sidebarOpened from '@stores/sidebarOpened';
	import activeSettings, { Theme } from '@stores/activeSettings';
	import Router from 'svelte-spa-router';
	import routes from './routes';

	activeSettings.subscribe(settings => {
		document.body.classList.forEach(x => {
			if (x.startsWith('theme-')) document.body.classList.remove(x);
		});
		document.body.classList.add(`theme-${Theme[settings.theme]}`);
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
		<Router {routes} />
	</div>

	<NewVersionAvailable />
</div>
