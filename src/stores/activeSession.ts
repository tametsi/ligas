import { get, writable } from 'svelte/store';
import Timer from '@lib/timer';
import Run from '@lib/run';
import Session from '@lib/session';

function createStore() {
	const { set, subscribe, update } = writable(
		new Session(new Timer(), new Run())
	);

	return {
		set,
		subscribe,
		updateSelf: (updater: (x: Session) => void) => {
			update(x => {
				updater(x);
				return x;
			});
		},
	};
}
const activeSession = createStore();
window.addEventListener('beforeunload', () => get(activeSession).save());
export default activeSession;
