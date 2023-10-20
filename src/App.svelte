<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import Navbar from '@components/layout/Navbar.svelte';
	import NewVersionAvailable from '@components/elements/NewVersionAvailable.svelte';
	import activeSettings from '@stores/activeSettings';
	import Router from 'svelte-spa-router';
	import routes from './routes';

	$: document.documentElement.setAttribute(
		'data-theme',
		$activeSettings.theme,
	);
</script>

<div class="drawer lg:drawer-open">
	<input type="checkbox" id="drawer-toggle" class="drawer-toggle" />
	<div class="drawer-content bg-base-200 min-h-screen overflow-x-hidden">
		<Navbar />

		<Router {routes} />
	</div>
	<div class="drawer-side z-20">
		<label for="drawer-toggle" class="drawer-overlay" />

		<Sidebar />
	</div>
</div>

<div class="toast">
	<NewVersionAvailable />
</div>
