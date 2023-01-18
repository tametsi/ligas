import Settings from '@lib/settings';
import { get } from 'svelte/store';
import { createWriteableObjectStore } from './createStore';
export { Theme, SessionLoading } from '@lib/settings';

const activeSettings = createWriteableObjectStore(
	Settings.load() ?? new Settings()
);
window.addEventListener('beforeunload', () => get(activeSettings).save());
export default activeSettings;
