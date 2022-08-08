import History from '@lib/util/history';
import Runner from '@lib/runner';

export const runHistory = new History<Run, ReturnType<Run['toJSON']>>(
	'savedRuns'
);

export default class Run {
	private _runners: Map<string, Runner> = new Map();
	public save: () => void;

	constructor() {
		const updater = runHistory.createEntry(this);
		this.save = () => updater(this);
	}

	/** The distance of a single round in this run (in meters) */
	public roundLength = 400;

	/** All the runners currently being part of this run */
	get runners() {
		return [...this._runners.values()];
	}

	/** The statistics of this run (naming and performance of all runners) */
	get stats() {
		const header = [
			'Name',
			'Alias',
			'Rounds',
			'Distance (in m)',
			'Max. Difference (in s)',
			'Rounds (Format: mm:ss:ff)',
		];
		const stats = this.runners.map(runner => runner.stats);

		return [header, ...stats];
	}

	/**
	 * Adds a runner with the given Information to this run
	 * @param name The name of the new runner
	 * @param alias The alias of the new runner
	 */
	addRunner(name: string, alias?: string) {
		let id = this._runners.size;

		do {
			id += 1;
		} while (this._runners.has(id.toString()));

		this.addExistingRunner(new Runner(this, id.toString(), name, alias));
	}

	/**
	 * Adds an pre-existing runner to this run
	 * @param runner The runner itself
	 */
	private addExistingRunner(runner: Runner) {
		this._runners.set(runner.id, runner);
		this.save();
	}

	/**
	 * Delete a runner by its ID
	 * @param id The given ID
	 */
	deleteRunner(id: string) {
		this._runners.delete(id);
		this.save();
	}

	/** Creates a new Run from an json-like object */
	static fromJSON(json: ReturnType<Run['toJSON']>) {
		const run = new Run();
		run.roundLength = json.roundLength;
		json.runners.forEach(jsonRunner =>
			run.addExistingRunner(Runner.fromJSON(run, jsonRunner))
		);
		run.save();
		return run;
	}

	/** Converts this run to a json-like object */
	toJSON() {
		return {
			runners: this.runners.map(runner => runner.toJSON()),
			roundLength: this.roundLength,
		};
	}
}
