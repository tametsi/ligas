import Settings from '@lib/settings';
import { createWriteableObjectStore } from './createStore';
export { Theme, SessionLoading } from '@lib/settings';

const activeSettings = createWriteableObjectStore(
	Settings.load() ?? new Settings()
);
window.addEventListener('storage', ({ key }) => {
	if (key !== 'settings') return;
	activeSettings.set(Settings.load());
});
activeSettings.subscribe(settings => settings.save());
export default activeSettings;
