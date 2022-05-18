import formatTime from '../src/lib/util/formatTime';

describe('formatTime', () => {
	it('formatting', () => {
		const defaultTime = '00:00:00';

		expect(formatTime(NaN)).toBe(defaultTime);
		expect(formatTime(null)).toBe(defaultTime);
		expect(formatTime(undefined)).toBe(defaultTime);

		expect(formatTime(0)).toBe(defaultTime);
		expect(formatTime(110)).toBe('00:00:11');
		expect(formatTime(610)).toBe('00:00:61');
		expect(formatTime(6610)).toBe('00:06:61');
		expect(formatTime(61000)).toBe('01:01:00');
		expect(formatTime(60000 * 60 - 10)).toBe('59:59:99');
		expect(formatTime(60000 * 60)).toBe('00:00:00');
	});
});
