import assert from 'assert';
import groupBy from '../index';

before(function () {
	window.fixture.load('/test/fixtures/index.html');
});

after(function () {
	window.fixture.cleanup();
});

it('handles simple array', function () {
	const array = [1];
	const context = {};
	groupBy.call(context, array, function (...arguments_) {
		const [value, key, that] = arguments_;
		assert.equal(
			arguments_.length,
			3,
			'Correct number of callback arguments'
		);
		assert.equal(value, 1, 'Correct value in callback');
		assert.equal(key, 0, 'Correct index in callback');
		assert.equal(that, array, 'Correct link to array in callback');
		assert.equal(this, context, 'Correct callback context');
	});
});

it('handles complex arrays', function () {
	/* eslint-disable no-undefined */
	assert.deepEqual(
		groupBy([1, 2, 3], (value) => value % 2),
		{ 1: [1, 3], 0: [2] },
		'#1'
	);
	assert.deepEqual(
		groupBy(
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			(value) => `i${value % 5}`
		),
		{ i1: [1, 6, 11], i2: [2, 7, 12], i3: [3, 8], i4: [4, 9], i0: [5, 10] },
		'#2'
	);
	assert.deepEqual(
		groupBy(Array.from({ length: 3 }), (value) => value),
		{ undefined: [undefined, undefined, undefined] },
		'#3'
	);
});

it('handles invalid arguments', function () {
	assert.throws(() => groupBy(null, () => {}), TypeError);
	assert.throws(() => groupBy([], null), TypeError);
});
