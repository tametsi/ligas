export default async function checkForUpdate() {
	const version = __APP_VERSION__;

	const releases: {
		prerelease: boolean;
		tag_name: string;
		assets: { browser_download_url: string }[];
	}[] = await (
		await fetch('https://api.github.com/repos/tametsi/ligas/releases')
	).json();

	return releases
		.filter(
			x =>
				!x.prerelease &&
				compareVersions(x.tag_name.substring(1), version) === 1
		)
		?.sort((a, b) =>
			compareVersions(b.tag_name.substring(1), a.tag_name.substring(1))
		)?.[0];
}

/** @returns 1 if a > b; 0 if a = b; -1 if a < b */
export function compareVersions(vA: string, vB: string): number {
	const a = vA.split('.'),
		b = vB.split('.');

	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		if (Number(a[i] ?? 0) > Number(b[i] ?? 0)) return 1;
		if (Number(a[i] ?? 0) < Number(b[i] ?? 0)) return -1;
	}

	return 0;
}
