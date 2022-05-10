import Timer, { TimerState } from '../src/lib/timer';
import sleep from './util/sleep';

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

	it('correct measuring', async () => {
		const startTimestamp = timer.start();

		await sleep(100);
		const runTimeAfter100 = timer.getRunDuration();
		const timerValidatingTimestamp = new Date().valueOf();
		await sleep(100);

		const runDuration = timer.stop();

		expect(runDuration).toBe(timer.getRunDuration());
		expect(runTimeAfter100).toBeGreaterThanOrEqual(100);
		expect(runTimeAfter100).toBeLessThanOrEqual(
			timerValidatingTimestamp - startTimestamp
		);
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
