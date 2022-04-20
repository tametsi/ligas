import { writable } from 'svelte/store';

export enum Page {
	main,
	edit,
	about,
}

export default writable<Page>(Page.main);
