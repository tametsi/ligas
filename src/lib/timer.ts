export enum TimerState {
	stopped,
	running,
}

export default class Timer {
	private _startTimestamp: number;
	private _stopTimestamp: number;
	private _state = TimerState.stopped;

	/** The timer`s current state */
	get state() {
		return this._state;
	}

	/**
	 * Starts the timer.
	 * @returns the `startTimestamp` or -1 if failed
	 */
	start() {
		if (this.state === TimerState.running) return -1;

		this._startTimestamp = new Date().valueOf();
		this._state = TimerState.running;

		return this._startTimestamp;
	}

	/**
	 * Stops the timer.
	 * @returns the timer´s run duration equal to `getRunDuration()` or -1 if failed
	 */
	stop() {
		if (this.state === TimerState.stopped) return -1;

		this._stopTimestamp = new Date().valueOf();
		this._state = TimerState.stopped;

		return this.getRunDuration();
	}

	toggle() {
		switch (this.state) {
			case TimerState.running:
				this.stop();
				break;
			case TimerState.stopped:
				this.reset();
				this.start();
				break;
		}
	}

	/** Resets the timer. */
	reset() {
		this._startTimestamp = undefined;
		this._stopTimestamp = undefined;
		this._state = TimerState.stopped;
	}

	/** @returns the total timer`s run duration */
	getRunDuration(): number {
		return (
			(this._stopTimestamp ?? new Date().valueOf()) - this._startTimestamp
		);
	}

	/** Creates a new timer from an json-like object */
	static fromJSON(json: ReturnType<Timer['toJSON']>) {
		const timer = new Timer();
		timer._startTimestamp = json.startTimestamp;
		timer._stopTimestamp = json.stopTimestamp;
		timer._state = json.state;
		return timer;
	}

	/** Converts this timer to a json-like object */
	toJSON() {
		return {
			startTimestamp: this._startTimestamp,
			stopTimestamp: this._stopTimestamp,
			state: this._state,
		};
	}
}
