import { writable } from 'svelte/store';

export enum Page {
	main,
}

export default writable<Page>(Page.main);
