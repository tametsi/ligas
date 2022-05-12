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
	get rounds(): Readonly<RoundManager> {
		return this._rounds;
	}
}

class RoundManager {
	private _rounds: number[] = [];

	/** The rounds, chronologically sorted, as duration (in ms). */
	get all(): Readonly<number[]> {
		return this._rounds;
	}

	/** The last round as duration (in ms). */
	get last() {
		return this._rounds.at(-1);
	}

	/** The total amount of registered rounds. */
	get count() {
		return this._rounds.length;
	}

	/** The duration of all rounds added up */
	get totalTime() {
		return this.all.reduce((acc, cur) => acc + cur, 0) || 0;
	}

	/**
	 * Registers a new round
	 * @param duration time the round has taken (in ms)
	 */
	add(duration: number) {
		this._rounds.push(duration);
	}

	/**
	 * Registers a new round according to the passed time
	 * @param time passed time (in ms) until the round was finished
	 */
	addByTime(time: number) {
		this.add(time - this.totalTime);
	}
}
