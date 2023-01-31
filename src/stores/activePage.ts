import { writable } from 'svelte/store';

export enum Page {
	Main,
	Edit,
	Export,
	Analytics,
	History,
	Settings,
	About,
}

export default writable<Page>(Page.Main);
