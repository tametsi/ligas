export default {
	runner: {
		delete_prompt: 'Do you really want to delete this runner?',
		delete: 'Delete',
		stats: {
			name: 'Name',
			alias: 'Alias',
			rounds: 'Rounds (Format: mm:ss:ff)',
			distance: 'Distance',
			average_roundtime: 'Average Roundtime',
			fastest_round: 'Fastest Round',
			slowest_round: 'Slowest Round',
			max_difference: 'Max. Difference (in s)',
		},
	},
	timer: {
		reset_prompt: 'Do you really want to reset the timer?',
	},
	about: {
		title: 'About',
		app_title: 'LIGAS - Time measurement made easy!',
		app_description: [
			'LIGAS is a tool to simplify the measurement',
			'and managment',
			'of round times during a competition.',
		],
		open_source: 'This project is open source. The code can be found on',
		libraries: 'Libraries',
		built_with: ['Built with', 'and TypeScript'],
	},
	analytics: {
		title: 'Analytics',
		round: 'Round',
		select_runner: 'Select Runner',
	},
	edit: {
		title: 'Edit',
		run_details: 'Run Details',
		round_length: 'Round Length',
		round_length_description: `Specify the length of a single round to give LIGAS the
			possibility to calculate the complete route length the
			runners passed.`,
		alias_description: `The alias will be shown if provided. The name can also be
			seen. Both, the name and the alias are listed in the round
			data.`,
		add_runner: 'Add Runner',
	},
	export: {
		title: 'Export',
	},
	history: {
		title: 'History',
		sorting: {
			title: 'Sort By',
			modification_descending: 'Modification Date: Newest to oldest',
			modification_ascending: 'Modification Date: Oldest to newest',
			creation_descending: 'Creation Date: Newest to oldest',
			creation_ascending: 'Creation Date: Oldest to newest',
		},
		empty_sessions: 'Exclude Empty Sessions',
		empty_sessions_description:
			'Empty sessions are sessions without runners.',
		new_run: 'New Run',
		no_entries: `No history entries created yet, but your current progress will be
			automatically saved when you leave the page.`,
		entry: {
			time: 'Time',
			runners: 'Runners',
			none: 'None',
			last_modified: 'Last modified',
			created: 'Created',
			copy: 'Copy',
			copy_title:
				'Copies this session and loads the copy. This session will stay untouched.',
			load: 'Load',
			load_title: 'Loads this session. This session will be modified.',
			load_prompt: [
				'Do you really want to',
				' that session? Your current session will be lost!',
			],
			delete: 'Delete',
			delete_title: 'Deletes this session.',
			delete_prompt: 'Do you really want to delete this session?',
		},
	},
	main: {
		title: 'Home',
		no_runners: 'No runners created yet.',
		change_it: 'Change it!',
	},
	settings: {
		title: 'Settings',
		theme: 'Theme',
		themes: {
			dark: 'Dark',
			light: 'Light',
			night: 'Night',
		},
		session_loading: {
			title: 'Autoload Sessions',
			never: 'Never',
			incomplete: 'Incomplete',
			always: 'Always',
		},
		language: 'Language',
	},
};
