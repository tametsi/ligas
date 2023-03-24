export default {
	runner: {
		delete_prompt: 'Willst du diesen Läufer wirklich löschen?',
		delete: 'Löschen',
		stats: {
			name: 'Name',
			alias: 'Alias',
			rounds: 'Runden',
			distance: 'Distanz',
			average_roundtime: 'Durchschnittliche Rundenzeit',
			fastest_round: 'Schnellste Runde',
			slowest_round: 'Langsamste Runde',
			max_difference: 'Max. Unterschied',
		},
	},
	about: {
		title: 'Über LIGAS',
		app_title: 'LIGAS - Zeit messen leicht gemacht!',
		app_description: [
			'LIGAS ist ein Werkzeug, um das Messen',
			'und die Verwaltung',
			'von Rundenzeiten während einem Wettkampf zu erleichtern.',
		],
		open_source:
			'Dieses Projekt ist Open-Source. Der Code befindet sich auf',
		libraries: 'Programmbibliotheken',
		built_with: ['Gemacht mit', 'und TypeScript'],
	},
	analytics: {
		title: 'Statistiken',
		round: 'Runde',
		select_runner: 'Läufer auswählen',
	},
	edit: {
		title: 'Bearbeiten',
		run_details: 'Lauf-Informationen',
		round_length: 'Rundenlänge',
		round_length_description: `Lege die Strecke einer einzelnen Runde fest, um LIGAS die
			Möglichkeit zu geben, die gesamte Strecke zu berechnen, welche die Läufer
			zurückgelegt haben.`,
		alias_description: `Der Alias wird angezeigt, wenn er vorhanden ist. Der Name ist ebenfalls
			sichtbar. In den Rundendaten wird sowohl der Name als auch der Alias angezeigt.`,
		add_runner: 'Läufer hinzufügen',
	},
	export: {
		title: 'Exportieren',
	},
	history: {
		title: 'Verlauf',
		sorting: {
			title: 'Sortieren nach',
			modification_descending: 'Änderungs-Datum: Neuste zuerst',
			modification_ascending: 'Änderungs-Datum: Älteste zuerst',
			creation_descending: 'Erstellungs-Datum: Neuste zuerst',
			creation_ascending: 'Erstellungs-Datum: Älteste zuerst',
		},
		empty_sessions: 'Leere Läufe ausblenden',
		empty_sessions_description:
			'Läufe sind dann leer, wenn sie keine Läufer haben.',
		new_run: 'Neuer Lauf',
		no_entries: `Es wurden noch keine Einträge im Verlauf erstellt, aber dein momentaner Fortschritt wird
			automatisch gespeichert sobald du die Seite verlässt.`,
		entry: {
			time: 'Zeit',
			runners: 'Läufer',
			none: 'Keiner',
			last_modified: 'Letzte Änderung',
			created: 'Erstelllung',
			copy: 'Kopieren',
			load: 'Laden',
			load_prompt: [
				'Möchtest du diesen Lauf wirklich',
				'? Dein aktueller Lauf wird dabei überschrieben!',
			],
			delete_prompt: 'Möchtest du diesen Lauf wirklich löschen?',
			delete: 'Löschen',
		},
	},
	main: {
		title: 'Hauptseite',
		no_runners: 'Noch keine Läufer vorhanden.',
		change_it: 'Ändere das!',
	},
	settings: {
		title: 'Einstellungen',
		theme: 'Erscheinungsbild',
		session_loading: {
			title: 'Lauf-Ladeverhalten',
			never: 'Nie',
			incomplete: 'Unvollständige',
			always: 'Immer',
		},
		language: 'Sprache',
	},
} satisfies typeof import('./en').default;
