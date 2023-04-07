import { readable, derived } from 'svelte/store';

const date = readable(new Date(), set => {
	const interval = setInterval(() => set(new Date()), 10);
	return () => clearInterval(interval);
});
export default class Timer {
	constructor(
		public duration = 1800000,
		private startTime = 0,
		private pausedTime = 0,
		private active = false
	) {}

	reset() {
		this.startTime = 0;
		this.pausedTime = 0;
		this.active = false;
	}

	private start() {
		if (this.active) return;
		const pausedTime = Date.now() - this.pausedTime;
		this.startTime += pausedTime;
		this.active = true;
		this.pausedTime = 0;
	}

	private pause() {
		if (!this.active) return;
		this.pausedTime = Date.now();
		this.active = false;
	}

	get running() {
		return this.active;
	}

	set running(state: boolean) {
		state ? this.start() : this.pause();
	}

	toggle() {
		this.running = !this.running;
	}

	private get paused() {
		return derived(date, $date =>
			this.active ? 0 : $date.valueOf() - this.pausedTime
		);
	}

	get passed() {
		return derived([date, this.paused], ([$date, $paused]) => {
			const elapsed = $date.valueOf() - this.startTime - $paused;
			return Math.min(elapsed, this.duration, this.startTime);
		});
	}

	get remaining() {
		return derived(this.passed, $passed => this.duration - $passed);
	}

	/** Creates a new timer from an json-like object */
	static fromJSON(json: ReturnType<Timer['toJSON']>) {
		return new Timer(
			json.duration,
			json.started,
			json.paused,
			json.running
		);
	}

	/** Converts this timer to a json-like object */
	toJSON() {
		return {
			duration: this.duration,
			started: this.startTime,
			paused: this.pausedTime,
			running: this.active,
		};
	}
}
