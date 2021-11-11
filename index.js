function ponyfill(array, callback) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Can’t call method on ${array}`);
	}

	if (typeof callback !== 'function') {
		throw new TypeError(`${callback} is not a function`);
	}

	const result = {};

	array.forEach((value, index, array) => {
		const key = callback.call(this, value, index, array);
		result[key] ??= [];
		result[key].push(value);
	});

	return result;
}

/* istanbul ignore next */
function preferNative(array, callback) {
	if (typeof Array.prototype.groupBy !== 'undefined') {
		return array.groupBy(callback);
	}
	return ponyfill(array, callback);
}

export default ponyfill;

export { preferNative };
