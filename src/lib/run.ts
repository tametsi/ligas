import Runner from '@lib/runner';
import { get } from 'svelte/store';
import { _ } from '@lib/util/translations';
import activeSettings, { RunnerSorting } from '@stores/activeSettings';

export default class Run {
	private _runners: Map<string, Runner> = new Map();

	/** The distance of a single round in this run */
	public roundLength = 400;

	/** All the runners currently being part of this run */
	get runners() {
		return [...this._runners.values()].sort((r1, r2) => {
			switch (get(activeSettings).runnerSorting) {
				case RunnerSorting.None:
					return 0;

				case RunnerSorting.Name:
					return r1.name > r2.name ? 1 : -1;

				case RunnerSorting.Alias:
					return r1.alias > r2.alias ? 1 : -1;
			}
		});
	}

	/** The statistics of this run (naming and performance of all runners) */
	get stats() {
		const header = [
			get(_)('runner.stats.name'),
			get(_)('runner.stats.alias'),
			get(_)('runner.stats.rounds'),
			get(_)('runner.stats.distance'),
			get(_)('runner.stats.max_difference'),
			get(_)('runner.stats.rounds_format'),
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
	}

	/**
	 * Delete a runner by its ID
	 * @param id The given ID
	 */
	deleteRunner(id: string) {
		this._runners.delete(id);
	}

	/** Creates a new Run from an json-like object */
	static fromJSON(json: ReturnType<Run['toJSON']>) {
		const run = new Run();
		run.roundLength = json.roundLength;
		json.runners.forEach(jsonRunner =>
			run.addExistingRunner(Runner.fromJSON(run, jsonRunner))
		);
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
