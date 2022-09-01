import Timer from '@lib/timer';
import { createWriteableObjectStore } from '@stores/createStore';

export default createWriteableObjectStore(new Timer());
