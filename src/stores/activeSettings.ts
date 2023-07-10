import Settings from '@lib/settings';
import {
	setupTranslations,
	getLocaleFromNavigator,
	locale,
} from '@lib/util/translations';
import { createWriteableObjectStore } from './createStore';
export { Theme, SessionLoading, RunnerSorting } from '@lib/settings';

const activeSettings = createWriteableObjectStore(
	Settings.load() ?? new Settings()
);
window.addEventListener('storage', ({ key }) => {
	if (key !== 'settings') return;
	activeSettings.set(Settings.load());
});

setupTranslations();
activeSettings.subscribe(settings => {
	locale.set(
		settings.language === 'auto'
			? getLocaleFromNavigator()
			: settings.language
	);
	settings.save();
});
export default activeSettings;
