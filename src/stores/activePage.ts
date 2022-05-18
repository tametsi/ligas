import { writable } from 'svelte/store';

export enum Page {
	main,
	edit,
	export,
	about,
}

export default writable<Page>(Page.main);
