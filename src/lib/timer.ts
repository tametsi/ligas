import { get, readable, writable, Writable, derived } from 'svelte/store';

export enum TimerDirection {
	Upwards,
	Downwards,
}

export default class Timer {
	private static date = readable(new Date(), set => {
		const interval = setInterval(() => set(new Date()), 1);
		return () => clearInterval(interval);
	});

	public direction: Writable<TimerDirection>;
	public runtime: Writable<number>;
	public running: Writable<boolean>;
	private startTime: number;
	private pauseTime: number;

	constructor(
		direction = TimerDirection.Upwards,
		runtime = Infinity,
		running = false
	) {
		this.direction = writable(direction);
		this.runtime = writable(runtime);
		this.running = writable(running);

		this.startTime = Date.now();
		this.pauseTime = this.startTime;

		this.running.subscribe(running => {
			if (!running) return (this.pauseTime = Date.now());

			const elapsed = Date.now() - this.pauseTime;
			this.startTime += elapsed;
			this.pauseTime = 0;
		});
	}

	reset() {
		this.running.set(false);
		this.startTime = 0;
		this.pauseTime = 0;
	}

	get time() {
		return derived(
			[Timer.date, this.direction, this.runtime, this.running],
			([$date, $direction, $runtime, $running]) => {
				const elapsed = Math.min(
					$running
						? $date.valueOf() - this.startTime
						: this.pauseTime - this.startTime,
					$runtime
				);
				return $direction === TimerDirection.Upwards
					? elapsed
					: $runtime - elapsed;
			}
		);
	}

	static fromJSON(json: ReturnType<Timer['toJSON']>) {
		const timer = new Timer(json.direction, json.runtime, json.running);
		timer.startTime = json.startTime;
		timer.pauseTime = json.pauseTime;
		return timer;
	}

	toJSON() {
		return {
			direction: get(this.direction),
			runtime: get(this.runtime),
			running: get(this.running),
			startTime: this.startTime,
			pauseTime: this.pauseTime,
		};
	}
}
