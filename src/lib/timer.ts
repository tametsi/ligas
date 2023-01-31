export enum TimerState {
	Paused,
	Reset,
	Running,
}

export default class Timer {
	private _startTimestamp: number;
	private _stopTimestamp: number;
	private _pauseStart: number;
	private _pauseTimes: number[] = [];
	private _state = TimerState.Reset;

	/** The timer`s current state */
	get state() {
		return this._state;
	}

	/**
	 * Starts the timer.
	 * @returns the `startTimestamp` or -1 if failed
	 */
	start() {
		if (this.state === TimerState.Running) return -1;

		this._startTimestamp = new Date().valueOf();
		this._state = TimerState.Running;

		return this._startTimestamp;
	}

	/** Toggles pause state, starts the timer if reset */
	pause() {
		// start
		if (this._state === TimerState.Reset) return this.start();

		// unpause
		if (this._state === TimerState.Paused) return this._unpause();

		// pause
		this._pause();
	}

	private _pause() {
		this._state = TimerState.Paused;
		this._pauseStart = new Date().valueOf();
	}
	private _unpause() {
		this._pauseTimes.push(new Date().valueOf() - this._pauseStart);
		this._pauseStart = undefined;

		this._state = TimerState.Running;
	}

	/**
	 * Stops the timer.
	 * @returns the timer´s run duration equal to `getRunDuration()` or -1 if failed
	 */
	stop() {
		if (this.state === TimerState.Reset) return -1;

		this._stopTimestamp = new Date().valueOf();
		this._state = TimerState.Reset;

		return this.getRunDuration();
	}

	/** Resets the timer. */
	reset() {
		this._startTimestamp = undefined;
		this._stopTimestamp = undefined;
		this._pauseTimes = [];
		this._pauseStart = undefined;
		this._state = TimerState.Reset;
	}

	/** @returns the total timer`s run duration */
	getRunDuration(): number {
		const now = new Date().valueOf();
		// calculate pauses
		let totalPause = this._pauseTimes.reduce((prev, x) => prev + x, 0);

		if (this.state === TimerState.Paused)
			totalPause += now - this._pauseStart;

		return (this._stopTimestamp ?? now) - this._startTimestamp - totalPause;
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
