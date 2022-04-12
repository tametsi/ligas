import { writable } from 'svelte/store';

export enum Page {
	main,
	about,
}

export default writable<Page>(Page.main);
