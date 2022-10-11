import { get } from 'svelte/store';
import { createWriteableObjectStore } from '@stores/createStore';
import Timer from '@lib/timer';
import Run from '@lib/run';
import Session from '@lib/session';

const activeSession = createWriteableObjectStore(
	new Session(new Timer(), new Run())
);
window.addEventListener('beforeunload', () => get(activeSession).save());
export default activeSession;
