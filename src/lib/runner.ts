export default class Runner {
	constructor(
		private _id: string,
		private _name: string,
		private _alias?: string
	) {}

	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get alias() {
		return this._alias || '';
	}
}
