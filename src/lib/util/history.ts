class HistoryEntry<ContentType> {
	private _content: ContentType;
	public get content() {
		return this._content;
	}

	private _lastChanged: number;
	public get lastChanged() {
		return this._lastChanged;
	}

	public readonly created: number;

	constructor(
		content: ContentType,
		lifeData?: { lastChanged: number; created: number }
	) {
		this._content = content;
		this.created = lifeData?.created || Date.now();
		this._lastChanged = lifeData?.lastChanged || this.created;
	}

	/**	updates this history-entry with new content */
	update = (content: ContentType) => {
		this._content = content;
		this._lastChanged = Date.now();
	};

	/** Creates a new history-entry of the given type from an json-like object */
	static fromJSON<ContentType>(
		json: ReturnType<HistoryEntry<ContentType>['toJSON']>
	) {
		const entry = new HistoryEntry<ContentType>(json.content, {
			lastChanged: json.lastChanged,
			created: json.created,
		});
		return entry;
	}

	/** Converts this history-entry to a json-like object */
	toJSON = () => {
		return {
			content: this._content,
			lastChanged: this._lastChanged,
			created: this.created,
		};
	};
}

interface Storable<OutputType> {
	toJSON: () => OutputType;
}

export enum HistorySorting {
	ModificationAscending,
	ModificationDescending,
	CreationAscending,
	CreationDescending,
	None,
}

const HistorySorters: {
	[key in HistorySorting]: (
		a: [string, HistoryEntry<unknown>],
		b: [string, HistoryEntry<unknown>]
	) => number;
} = Object.freeze({
	[HistorySorting.ModificationAscending]: (a, b) =>
		a[1].lastChanged - b[1].lastChanged,
	[HistorySorting.ModificationDescending]: (a, b) =>
		b[1].lastChanged - a[1].lastChanged,
	[HistorySorting.CreationAscending]: (a, b) => a[1].created - b[1].created,
	[HistorySorting.CreationDescending]: (a, b) => b[1].created - a[1].created,
	[HistorySorting.None]: () => 0,
});

export default class History<
	InputType extends Storable<OutputType>,
	OutputType
> {
	constructor(private readonly name: string, public onUpdate?: () => void) {
		if (localStorage.getItem(this.name) === null) this.setHistory({});
	}

	/** Retrieves the history-object from local storage */
	private getHistory() {
		return JSON.parse(localStorage.getItem(this.name)) as object;
	}

	/** Sets the history-object in local storage */
	private setHistory(object: object) {
		return localStorage.setItem(this.name, JSON.stringify(object));
	}

	/** Sets a history-entry in local storage */
	private setEntry = (
		id: string,
		entry: HistoryEntry<InputType> | HistoryEntry<OutputType>
	) => {
		const history = this.getHistory();
		history[id] = entry;
		this.setHistory(history);
		this.onUpdate?.();
	};

	/** Available identifier with 8 characters of [a-z0-9] */
	private generateId = () => {
		const ran = Math.random()
			.toString(36)
			.substring(2, 10)
			.padStart(8, '0');
		const id: string = this.getEntries().has(ran) ? this.generateId() : ran;
		return id;
	};

	/** Creates a new history-entry in local storage */
	createEntry = (content: InputType) => {
		const id = this.generateId();
		const entry = new HistoryEntry(content);
		this.setEntry(id, entry);
		return id;
	};

	/**
	 * Retrieves a single entry from this history
	 * @param id Id of the entry to retrieve
	 */
	private getEntry = (id: string) => {
		return this.getEntries().get(id);
	};

	/** Retrieves all entries from this history */
	getEntries = () => {
		const history = this.getHistory();
		const entries = new Map(
			Object.entries(history).map(([id, historyObject]) => [
				id,
				HistoryEntry.fromJSON<OutputType>(historyObject),
			])
		);
		return entries;
	};

	/** Retrieves all entries from this history sorted */
	getEntriesSorted = (sorting = HistorySorting.None) => {
		return [...this.getEntries()].sort(HistorySorters[sorting]);
	};

	/** Updates a history-entry in local storage */
	updateEntry = (id: string, content: InputType) => {
		const entry = this.getEntry(id);
		entry.update(content.toJSON());
		this.setEntry(id, entry);
	};

	/** Removes a entry out of local storage */
	removeEntry = (id: string) => {
		this.setEntry(id, undefined);
	};
}
