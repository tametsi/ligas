import Runner from '@lib/runner';

export default class Run {
	private _runners: Map<string, Runner> = new Map();

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

		this._runners.set(
			id.toString(),
			new Runner(this, id.toString(), name, alias)
		);
	}

	/**
	 * Delete a runner by its ID
	 * @param id The given ID
	 */
	deleteRunner(id: string) {
		this._runners.delete(id);
	}
}
