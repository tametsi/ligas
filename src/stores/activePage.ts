import { writable } from 'svelte/store';

export enum Page {
	main,
	edit,
	export,
	analytics,
	about,
}

export default writable<Page>(Page.main);
