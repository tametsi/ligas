export default class Runner {
	private _rounds = new RoundManager();

	constructor(
		private _id: string,
		private _name: string,
		private _alias?: string
	) {}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get alias() {
		return this._alias || '';
	}
	/** This runner`s `RoundManager` */
	get rounds(): Readonly<typeof this._rounds> {
		return this._rounds;
	}
}

class RoundManager {
	private _rounds: number[] = [];

	/** The rounds, chronologically sorted as the time (in ms) how long the round took. */
	get rounds(): Readonly<typeof this._rounds> {
		return this._rounds;
	}

	/** The counted rounds */
	get count() {
		return this._rounds.length;
	}
}
