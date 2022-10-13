import { writable } from 'svelte/store';

export enum Page {
	main,
	edit,
	export,
	history,
	settings,
	about,
}

export default writable<Page>(Page.main);
