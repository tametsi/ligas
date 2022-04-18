import { writable } from 'svelte/store';
import Run from '../lib/run';

function createStore() {
	const { set, subscribe, update } = writable(new Run());

	return {
		set,
		subscribe,
		updateSelf: (updater: (x: Run) => void) => {
			update(x => {
				updater(x);
				return x;
			});
		},
	};
}

export default createStore();
