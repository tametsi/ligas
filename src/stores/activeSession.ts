import { get } from 'svelte/store';
import { createWriteableObjectStore } from '@stores/createStore';
import Timer from '@lib/timer';
import Run from '@lib/run';
import Session, { sessionHistory, HistorySorting } from '@lib/session';
import activeSettings, { SessionLoading } from './activeSettings';

const lastSessionEntry = sessionHistory.getEntriesSorted(
	HistorySorting.ModificationDescending
)[0];
const lastSession =
	lastSessionEntry === undefined
		? new Session(new Timer(), new Run())
		: Session.fromJSON(lastSessionEntry[1].content, lastSessionEntry[0]);

const loading = get(activeSettings).sessionLoading;
const activeSession = createWriteableObjectStore(
	loading === SessionLoading.Always ||
		(loading === SessionLoading.IncompleteSessions &&
			!lastSession.completed)
		? lastSession
		: new Session(new Timer(), new Run())
);
window.addEventListener('beforeunload', () => get(activeSession).save());
export default activeSession;
