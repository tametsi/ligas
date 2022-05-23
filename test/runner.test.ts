import Run from '../src/lib/run';
import Runner from '../src/lib/runner';

describe('Runner', () => {
	describe('RoundManager', () => {
		let runner: Runner;

		beforeEach(() => {
			runner = new Runner(new Run(), '1', 'name');
		});

		it('init', () => {
			expect(runner.rounds.all).toEqual([]);
			expect(runner.rounds.last).toBe(undefined);
			expect(runner.rounds.count).toBe(0);
			expect(runner.rounds.totalTime).toBe(0);
		});

		it('adding rounds', () => {
			expect(runner.rounds.all).toEqual([]);

			runner.rounds.add(10);
			runner.rounds.add(15);

			expect(runner.rounds.all).toEqual([10, 15]);
			expect(runner.rounds.last).toBe(15);
			expect(runner.rounds.count).toBe(2);
			expect(runner.rounds.totalTime).toBe(25);
		});

		it('adding rounds by time', () => {
			expect(runner.rounds.all).toEqual([]);

			runner.rounds.addByTime(10);
			runner.rounds.addByTime(25);

			expect(runner.rounds.all).toEqual([10, 15]);
			expect(runner.rounds.last).toBe(15);
			expect(runner.rounds.count).toBe(2);
			expect(runner.rounds.totalTime).toBe(25);
		});

		it('average, trend & variation', () => {
			expect(runner.rounds.averageTime).toBe(0);
			expect(runner.rounds.trend).toBe(0);
			expect(runner.rounds.variation).toBe(0);

			runner.rounds.add(-10);
			expect(runner.rounds.averageTime).toBe(-10);
			expect(runner.rounds.trend).toBe(0);
			expect(runner.rounds.variation).toBe(0);

			runner.rounds.add(10);
			expect(runner.rounds.averageTime).toBe(0);
			expect(runner.rounds.trend).toBe(10);
			expect(runner.rounds.variation).toBe(20);

			runner.rounds.add(30);
			expect(runner.rounds.averageTime).toBe(10);
			expect(runner.rounds.trend).toBe(20);
			expect(runner.rounds.variation).toBe(40);
		});
	});
});
