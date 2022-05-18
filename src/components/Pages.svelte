<script lang="ts">
	import activePage, { Page } from '../stores/activePage';
	import Main from './pages/Main.svelte';
	import Edit from './pages/Edit.svelte';
	import About from './pages/About.svelte';
	import Export from './pages/Export.svelte';

	function checkHash() {
		const hash = window.location.hash.substring(1);
		if (!Object.keys(Page).includes(hash)) return;

		$activePage = Page[hash as keyof typeof Page] ?? Page.main;
	}
	checkHash();

	// update hash
	$: window.location.hash = `#${Page[$activePage] ?? ''}`;
</script>

<svelte:window on:hashchange={checkHash} />

<Main />
<Edit />
<Export />
<About />
