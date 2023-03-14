<script lang="ts">
	import Sidebar from '@components/layout/Sidebar.svelte';
	import Navbar from '@components/layout/Navbar.svelte';
	import NewVersionAvailable from '@components/elements/NewVersionAvailable.svelte';
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

<div class="drawer drawer-mobile">
	<input type="checkbox" id="drawer-toggle" class="drawer-toggle" />
	<div class="drawer-content bg-base-200 z-10">
		<Navbar />

		<Router {routes} />
	</div>
	<div class="drawer-side">
		<label for="drawer-toggle" class="drawer-overlay" />

		<Sidebar />
	</div>
</div>

<div class="toast">
	<NewVersionAvailable />
</div>
