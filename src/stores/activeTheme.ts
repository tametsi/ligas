import { writable } from 'svelte/store';

export enum Theme {
	dark,
	light,
}

export default writable<Theme>(Theme.dark);
