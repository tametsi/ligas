import Run from '@lib/run';
import { createWriteableObjectStore } from '@stores/createStore';

export default createWriteableObjectStore(new Run());
