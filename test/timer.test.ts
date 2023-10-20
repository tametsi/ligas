import Timer, { TimerState } from '../src/lib/timer';

describe('Timer', () => {
	let timer: Timer;

	beforeEach(() => {
		timer = new Timer();
	});

	it('starting', () => {
		expect(timer.state).toBe(TimerState.Reset);

		const startTimestamp = timer.start();

		expect(startTimestamp).toBeTypeOf('number');
		expect(startTimestamp).toBeTruthy();
		expect(timer.state).toBe(TimerState.Running);
	});

	it('stopping', () => {
		const startTimestamp = timer.start();
		const runDuration = timer.stop();

		expect(timer['_stopTimestamp']).toBe(startTimestamp + runDuration);

		expect(timer.state).toBe(TimerState.Reset);
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

		expect(timer.state).toBe(TimerState.Running);

		const runDuration = timer.stop();
		const secondRunDuration = timer.stop();

		expect(timer.state).toBe(TimerState.Reset);

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

		expect(timer.state).toBe(TimerState.Reset);
		expect(timer['_startTimestamp']).toBeUndefined();
		expect(timer['_stopTimestamp']).toBeUndefined();
	});

	it('pause (states)', () => {
		timer.pause(); // start
		expect(timer.state).toBe(TimerState.Running);
		expect(timer['_startTimestamp']).toBeTruthy();
		expect(timer['_pauseStart']).toBeUndefined();
		expect(timer['_stopTimestamp']).toBeUndefined();

		timer.pause(); // pause
		expect(timer.state).toBe(TimerState.Paused);
		expect(timer['_startTimestamp']).toBeTruthy();
		expect(timer['_pauseStart']).toBeTruthy();
		expect(timer['_pauseTimes'].length).toBe(0);
		expect(timer['_stopTimestamp']).toBeUndefined();

		timer.pause(); // unpause
		expect(timer.state).toBe(TimerState.Running);
		expect(timer['_startTimestamp']).toBeTruthy();
		expect(timer['_pauseStart']).toBeUndefined();
		expect(timer['_pauseTimes'].length).toBe(1);
		expect(timer['_stopTimestamp']).toBeUndefined();
	});

	it('pause (runtime calculation)', () => {
		const timerAdvanceTimes = [1214, 7352, 4739];

		vi.useFakeTimers({ now: 0, toFake: ['Date'] });
		timer.pause(); // start

		vi.advanceTimersByTime(timerAdvanceTimes[0]);
		expect(timer.getRunDuration()).toBe(timerAdvanceTimes[0]);

		timer.pause(); // pause

		vi.advanceTimersByTime(timerAdvanceTimes[1]);
		expect(timer.getRunDuration()).toBe(timerAdvanceTimes[0]);

		timer.pause(); // unpause
		vi.advanceTimersByTime(timerAdvanceTimes[2]);
		expect(timer.getRunDuration()).toBe(
			timerAdvanceTimes[0] + timerAdvanceTimes[2],
		);

		vi.useRealTimers();
	});
});
