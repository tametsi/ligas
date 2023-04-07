<script lang="ts">
	import Timer from '@components/elements/Timer.svelte';
	import { MenuIcon } from 'svelte-feather-icons';
	import { _ } from '@lib/util/translations';
</script>

<nav class="navbar sticky top-0 z-50 bg-base-300 text-3xl text-justify">
	<!-- navbar content -->
	<div class="navbar-start">
		<label for="drawer-toggle" class="btn btn-ghost btn-square lg:hidden">
			<MenuIcon />
		</label>
	</div>

	<h1 class="navbar-center h-12 hidden md:flex">LIGAS</h1>

	<div class="navbar-end">
		<Timer />
	</div>
</nav>
