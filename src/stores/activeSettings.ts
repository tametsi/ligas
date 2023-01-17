import Settings from '@lib/settings';
import { createWriteableObjectStore } from './createStore';
export { Theme } from '@lib/settings';

const activeSettings = createWriteableObjectStore(new Settings());
export default activeSettings;
