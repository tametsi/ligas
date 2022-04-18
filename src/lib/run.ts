export default class Run {
	private _roundLength = 400;

	get roundLength() {
		return this._roundLength;
	}
	set roundLength(x) {
		this._roundLength = x;
	}
}
