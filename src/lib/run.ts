import Runner from './runner';

export default class Run {
	private _roundLength = 400;
	private _runners: Map<string, Runner> = new Map();

	get roundLength() {
		return this._roundLength;
	}
	set roundLength(x) {
		this._roundLength = x;
	}

	get runners() {
		return [...this._runners.values()];
	}

	addRunner(name: string, alias?: string) {
		let id = this._runners.size;

		do {
			id += 1;
		} while (this._runners.has(id.toString()));

		this._runners.set(
			id.toString(),
			new Runner(id.toString(), name, alias)
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
