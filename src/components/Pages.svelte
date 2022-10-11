<script lang="ts">
	import activePage, { Page } from '@stores/activePage';
	import Main from '@components/pages/Main.svelte';
	import Edit from '@components/pages/Edit.svelte';
	import About from '@components/pages/About.svelte';
	import Export from '@components/pages/Export.svelte';
	import Analytics from '@components/pages/Analytics.svelte';
	import History from '@components/pages/History.svelte';

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
<Analytics />
<History />
<About />
