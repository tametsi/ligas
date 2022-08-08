import type Run from '@lib/run';
import formatTime from '@lib/util/formatTime';

export default class Runner {
	private _rounds: RoundManager;

	constructor(
		private _run: Run,
		private _id: string,
		private _name: string,
		private _alias?: string
	) {
		this._rounds = new RoundManager();
	}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get alias() {
		return this._alias || '';
	}
	/** This runner's `RoundManager` */
	get rounds(): Readonly<RoundManager> {
		return this._rounds;
	}
	/** The `Run` this runner currently belongs to */
	get run(): Readonly<Run> {
		return this._run;
	}

	/** The distance this runner already covered in the current run */
	get distance() {
		return (
			Math.round(this._run.roundLength * this._rounds.count * 10 || 0) /
			10
		);
	}

	/** The statistics of this runner (including naming and performance) */
	get stats() {
		return [
			this.name,
			this.alias,
			`${this.rounds.count}`,
			`${this.distance}`,
			`${Math.round(this.rounds.variation / 1000)}`,
			...this.rounds.all.map(ms => formatTime(ms)),
		];
	}

	/** Creates a new runner from an json-like object */
	static fromJSON(run: Run, json: ReturnType<Runner['toJSON']>) {
		const runner = new Runner(run, json.id, json.name, json.alias);
		runner._rounds = RoundManager.fromJSON(json.rounds);
		return runner;
	}

	/** Converts this runner to a json-like object */
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			alias: this.alias,
			rounds: this.rounds.toJSON(),
		};
	}
}

class RoundManager {
	private _rounds: number[] = [];

	constructor() {}

	/** The rounds, chronologically sorted, as duration (in ms). */
	get all() {
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

	/** The average time of a round (in ms) */
	get averageTime() {
		return this.totalTime / this.count || 0;
	}

	/** The time of the last round compared with the average round time */
	get trend() {
		return this.last - this.averageTime || 0;
	}

	/** The difference in time between the fastest and slowest round (in ms) */
	get variation() {
		return this.count > 0
			? Math.max(...this.all) - Math.min(...this.all)
			: 0;
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

	/** Creates a new round-manager from an json-like object */
	static fromJSON(json: ReturnType<RoundManager['toJSON']>) {
		const rounds = new RoundManager();
		rounds._rounds = json.rounds;
		return rounds;
	}

	/** Converts this round-manager to a json-like object */
	toJSON() {
		return {
			rounds: this.all,
		};
	}
}
