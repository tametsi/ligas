import Runner from './runner';

export default class Run {
	private _runners: Map<string, Runner> = new Map();

	/** The distance of a single round in this run (in meters) */
	public roundLength = 400;

	/** All the runners currently being part of this run */
	get runners() {
		return [...this._runners.values()];
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
