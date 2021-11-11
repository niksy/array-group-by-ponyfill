/**
 * @template T
 * @typedef {{[key: string|number]: T[]}} Group
 */

/**
 * @template T
 * @callback Callback
 * @param   {T}             value Current iteration value.
 * @param   {number}        index Current iteration index.
 * @param   {T[]}           array Original array reference.
 * @returns {string|number}
 */

/**
 * Group array items.
 *
 * @template T
 * @callback Ponyfill
 * @param   {T[]}         array    Array to group.
 * @param   {Callback<T>} callback Callback which should return key with which to group array.
 * @returns {Group<T>}
 */

/**
 * @template T
 * @type {Ponyfill<T>}
 * @this {T[]}
 */
function ponyfill(array, callback) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Can’t call method on ${array}`);
	}

	if (typeof callback !== 'function') {
		throw new TypeError(`${callback} is not a function`);
	}

	/**
	 * @template T
	 * @type {Group<T>}
	 */
	const result = {};

	array.forEach((value, index, array) => {
		const key = callback.call(this, value, index, array);
		result[key] ??= [];
		result[key].push(value);
	});

	return result;
}

/* istanbul ignore next */

/**
 * @template T
 * @type {Ponyfill<T>}
 */
function preferNative(array, callback) {
	// @ts-ignore
	if (typeof Array.prototype.groupBy !== 'undefined') {
		// @ts-ignore
		return array.groupBy(callback);
	}
	return ponyfill(array, callback);
}

export default ponyfill;

export { preferNative };
