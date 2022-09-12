import { writable } from 'svelte/store';

export function createWriteableObjectStore<T>(value: T) {
	const { set, subscribe, update } = writable(value);

	return {
		set,
		subscribe,
		updateSelf: (updater: (x: T) => void = x => x) => {
			update(x => {
				updater(x);
				return x;
			});
		},
	};
}
