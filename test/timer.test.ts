import Timer, { TimerState } from '../src/lib/timer';

describe('Timer', () => {
	let timer: Timer;

	beforeEach(() => {
		timer = new Timer();
	});

	it('starting', () => {
		expect(timer.state).toBe(TimerState.stopped);

		const startTimestamp = timer.start();

		expect(startTimestamp).toBeTypeOf('number');
		expect(startTimestamp).toBeTruthy();
		expect(timer.state).toBe(TimerState.running);
	});

	it('stopping', () => {
		const startTimestamp = timer.start();
		const runDuration = timer.stop();

		expect(timer['_stopTimestamp']).toBe(startTimestamp + runDuration);

		expect(timer.state).toBe(TimerState.stopped);
		expect(runDuration).toBe(timer.getRunDuration());
	});

	it('correct measuring', () => {
		vi.useFakeTimers({ now: 0, toFake: ['Date'] });
		timer.start();

		vi.advanceTimersByTime(1214);
		expect(timer.getRunDuration()).toBe(1214);

		vi.advanceTimersByTime(2796);
		const runDuration = timer.stop();

		expect(runDuration).toBe(timer.getRunDuration());
		expect(runDuration).toBe(1214 + 2796);

		vi.useRealTimers();
	});

	it('calling methods multiple times', () => {
		const startTimestamp = timer.start();
		const secondStartTimestamp = timer.start();

		expect(timer.state).toBe(TimerState.running);

		const runDuration = timer.stop();
		const secondRunDuration = timer.stop();

		expect(timer.state).toBe(TimerState.stopped);

		expect(startTimestamp).toBeTypeOf('number');
		expect(startTimestamp).toBeTruthy();

		expect(timer['_stopTimestamp']).toBe(startTimestamp + runDuration);
		expect(runDuration).toBe(timer.getRunDuration());

		expect(secondRunDuration).toBe(-1);
		expect(secondStartTimestamp).toBe(-1);
	});

	it('resetting', () => {
		timer.start();
		timer.reset();

		expect(timer.state).toBe(TimerState.stopped);
		expect(timer['_startTimestamp']).toBeUndefined();
		expect(timer['_stopTimestamp']).toBeUndefined();
	});

	it('toggle', () => {
		timer.toggle();
		expect(timer.state).toBe(TimerState.running);
		timer.toggle();

		expect(timer.state).toBe(TimerState.stopped);
		expect(timer['_startTimestamp']).toBeTruthy();
		let oldStartTimestamp = timer['_startTimestamp'];
		expect(timer['_stopTimestamp']).toBeTruthy();

		timer.toggle();
		expect(timer.state).toBe(TimerState.running);
		expect(timer['_startTimestamp']).toBeGreaterThanOrEqual(
			oldStartTimestamp
		);
		expect(timer['_stopTimestamp']).toBeUndefined();
	});
});
