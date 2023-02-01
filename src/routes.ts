import About from '@components/pages/About.svelte';
import Analytics from '@components/pages/Analytics.svelte';
import Edit from '@components/pages/Edit.svelte';
import Export from '@components/pages/Export.svelte';
import History from '@components/pages/History.svelte';
import Main from '@components/pages/Main.svelte';
import Settings from '@components/pages/Settings.svelte';

export default {
	'/': Main,
	'/edit': Edit,
	'/export': Export,
	'/analytics': Analytics,
	'/history': History,
	'/settings': Settings,
	'/about': About,
};
