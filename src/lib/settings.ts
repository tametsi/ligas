export enum Theme {
	dark,
	light,
}

export default class Settings {
	constructor(public theme = Theme.dark) {}
}
