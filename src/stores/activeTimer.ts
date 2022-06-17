import { writable } from 'svelte/store';
import Timer from '@lib/timer';

function createStore() {
	const { set, subscribe, update } = writable(new Timer());

	return {
		set,
		subscribe,
		updateSelf: (updater: (x: Timer) => void) => {
			update(x => {
				updater(x);
				return x;
			});
		},
	};
}

export default createStore();
