export enum Theme {
	Dark = 'dark',
	Light = 'light',
	Night = 'night',
}

export enum SessionLoading {
	Never,
	IncompleteSessions,
	Always,
}

export enum RunnerSorting {
	Name,
	Alias,
	None,
}

const storageId = 'settings';
export default class Settings {
	constructor(
		public theme = Theme.Dark,
		public sessionLoading = SessionLoading.Never,
		public runnerSorting = RunnerSorting.None,
		public language = 'auto'
	) {}

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
		return new Settings(
			json.theme,
			json.sessionLoading,
			json.runnerSorting,
			json.language
		);
	}

	/** Converts the settings to a json-like object */
	toJSON() {
		return {
			theme: this.theme,
			sessionLoading: this.sessionLoading,
			runnerSorting: this.runnerSorting,
			language: this.language,
		};
	}
}
