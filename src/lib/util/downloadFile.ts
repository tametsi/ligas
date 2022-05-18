export interface DownloadOptions {
	filename?: string;
	type?: string;
}

export function downloadFile(data: string, options?: DownloadOptions) {
	if (!document) return;

	const url = URL.createObjectURL(
		new Blob([data], {
			type: options?.type ?? 'text/plain;charset=utf-8;',
		})
	);

	const anchor = Object.assign(document.createElement('a'), {
		download: options?.filename || 'file.txt',
		href: url,
	});

	document.body.appendChild(anchor).click();
	document.body.removeChild(anchor);

	URL.revokeObjectURL(url);
}

export function downloadCsv(rows: string[], filename?: string) {
	downloadFile(rows.join('\n'), {
		filename: filename || 'file.csv',
		type: 'application/csv;charset=utf-8;',
	});
}
