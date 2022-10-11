import { compareVersions } from '@lib/util/checkForUpdate';

describe('compareVersions', () => {
	it('#1', () => {
		expect(compareVersions('1.0.0', '1.0.0.0')).toBe(0);
		expect(compareVersions('1.01.7', '1.1.7.0')).toBe(0);

		expect(compareVersions('1.0.0.0', '1.0.0.1')).toBe(-1);
		expect(compareVersions('1.0.0', '1.0.0.1')).toBe(-1);
		expect(compareVersions('1.0.1', '1.0.1.1')).toBe(-1);

		expect(compareVersions('1.10.2', '1.4.8.1')).toBe(1);
		expect(compareVersions('1.10.2', '1.10.8.1')).toBe(-1);
	});
});
