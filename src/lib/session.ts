import History from '@lib/util/history';
import Run from '@lib/run';
import Timer from '@lib/timer';

export const sessionHistory = new History<
	Session,
	ReturnType<Session['toJSON']>
>('sessionHistory');

export default class Session {
	constructor(public timer: Timer, public run: Run, public id?: string) {}

	/** Saves this session to history */
	save() {
		this.id === undefined
			? (this.id = sessionHistory.createEntry(this))
			: sessionHistory.updateEntry(this.id, this);
	}

	/** Deletes this session from history (if it was saved before) */
	delete() {
		if (this.id !== undefined) sessionHistory.removeEntry(this.id);
	}

	/** Creates a new session with the same properties (except the id) */
	clone() {
		return Session.fromJSON(this.toJSON());
	}

	/** Creates a new session from an json-like object */
	static fromJSON(json: ReturnType<Session['toJSON']>, id?: string) {
		return new Session(
			Timer.fromJSON(json.timer),
			Run.fromJSON(json.run),
			id
		);
	}

	/** Converts this session to a json-like object */
	toJSON() {
		return {
			timer: this.timer.toJSON(),
			run: this.run.toJSON(),
		};
	}
}
