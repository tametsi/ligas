export enum Theme {
	dark,
	light,
}

const storageId = 'settings';
export default class Settings {
	constructor(public theme = Theme.dark) {}

	/** Loads the settings from local storage */
	static load() {
		const settings = localStorage.getItem(storageId);
		if (settings === null) return null;
		return Settings.fromJSON(JSON.parse(settings));
	}

	/** Saves the settings in local storage */
	save() {
		localStorage.setItem(storageId, JSON.stringify(this));
	}

	/** Creates new settings from an json-like object */
	static fromJSON(json: ReturnType<Settings['toJSON']>) {
		return new Settings(json.theme);
	}

	/** Converts the settings to a json-like object */
	toJSON() {
		return {
			theme: this.theme,
		};
	}
}
