// thaw-macd/test/main.test.ts

'use strict';

// import {
// 	indicatorExponentialMovingAverage,
// 	indicatorMacd //,
// 	// indicatorMovingAverage
// } from '@d3fc/d3fc-technical-indicator';

import * as macdKaelZhang from 'macd';
import * as d3fc from '@d3fc/d3fc-technical-indicator';

// import { pointwise } from 'thaw-common-utilities.ts';

import {
	ema,
	macd,
	macdGetOneResult // , sma
} from '../lib/main';

const array1 = [
	2,
	3,
	5,
	7,
	11,
	13,
	17,
	19,
	23,
	29,
	31,
	37,
	41,
	43,
	47,
	53,
	59,
	61,
	67,
	71,

	2,
	3,
	5,
	7,
	11,
	13,
	17,
	19,
	23,
	29,
	31,
	37,
	41,
	43,
	47,
	53,
	59,
	61,
	67,
	71
];

const fast = 12,
	slow = 26,
	signal = 9;

const fnNaNToUndefined = (n: number) => (Number.isNaN(n) ? undefined : n);

test('Placeholder test', () => {
	// Arrange
	// Act
	// Assert
	expect(true).toBeTruthy();
});

test('typeof test', () => {
	// Arrange
	// Act
	// Assert
	expect(typeof 0).toBe('number');
	expect(typeof NaN).toBe('number');
	expect(typeof 'string').toBe('string');
});

test('@d3fc ema Test 1', () => {
	// Arrange
	const period = 9;

	// Act
	const resultThaw = ema(array1, period, period).map(fnNaNToUndefined);
	const fnD3fc = d3fc.indicatorExponentialMovingAverage();

	fnD3fc.period(period);

	const resultD3fc = fnD3fc(array1);

	// console.log('macdThaw: result is', resultThaw);
	// console.log('d3fc: result is', resultD3fc);

	// Assert
	// test.expect(1);
	// assert.deepEqual(resultThaw, resultD3fc);
	expect(resultThaw).toStrictEqual(resultD3fc);
});

test('EMA test', () => {
	// Arrange
	// Act
	const emaArray = ema(array1, 9);

	// console.log('My EMA is', emaArray);

	// Assert
	expect(emaArray).toBeTruthy();
});

// describe('Test 2 - MACD', () => {
// 	it('Rocks!', done => {
// 		// Arrange
// 		const fast = 12;
// 		const slow = 26;
// 		const signal = 9;

// 		// Act
// 		const resultThaw1 = macd(array1, fast, slow, signal, false);
// 		const resultThaw2 = macd(array1, fast, slow, signal, true);
// 		const resultKaelZhang = macdKaelZhang(array1, slow, fast, signal);
// 		const fnD3fc = indicatorMacd();

// 		fnD3fc.fastPeriod(fast);
// 		fnD3fc.slowPeriod(slow);
// 		fnD3fc.signalPeriod(signal);

// 		const resultD3fc = fnD3fc(array1);
// 		const resultMacdD3fc = resultD3fc.map(datum => datum.macd);
// 		const resultSignalD3fc = resultD3fc.map(datum => datum.signal);

// 		// console.log('macdThaw: result 1 is', resultThaw1);
// 		// console.log('macdThaw: result 2 is', resultThaw2);
// 		// console.log('Kael Zhang macd: result is', resultKaelZhang);
// 		// console.log('d3fc macd: result is', d3fcti.indicatorMacd()(array));
// 		// console.log('d3fc: result is', resultD3fc);
// 		// console.log('d3fc macd: result is', resultMacdD3fc);
// 		// console.log('d3fc signal: result is', resultSignalD3fc);

// 		// Assert
// 		// test.expect(4);

// 		// test.equal(actualValue, expectedValue, `Should be ${expectedValue}`);
// 		assert.deepEqual(resultThaw1.macd, resultKaelZhang.MACD);
// 		assert.deepEqual(resultThaw1.signal, resultKaelZhang.signal);
// 		assert.deepEqual(resultThaw2.macd, resultMacdD3fc);
// 		assert.deepEqual(resultThaw2.signal, resultSignalD3fc);

// 		done();
// 	});
// });

test('MACD test', () => {
	// Arrange
	// Act
	const [macdArray, signalArray] = macd(array1);

	// console.log('macd test: macdArray is', macdArray);
	// console.log('macd test: signalArray is', signalArray);

	// Assert
	expect(macdArray).toBeTruthy();
	expect(signalArray).toBeTruthy();
});

test('macdGetOneResult test', () => {
	// Arrange
	// Act
	const [macdValue, signalValue] = macdGetOneResult(array1);

	// console.log('macdGetOneResult test: macdValue is', macdValue);
	// console.log('macdGetOneResult test: signalValue is', signalValue);

	// Assert
	expect(macdValue).toBeTruthy();
	expect(signalValue).toBeTruthy();
});

test('KaelZhang macd Test 1 Comprehensive', () => {
	// console.log(
	// 	'macdKaelZhang is',
	// 	typeof macdKaelZhang,
	// 	macdKaelZhang
	// );

	for (let i = 0; i < array1.length; i++) {
		// Arrange
		const array = array1.slice(i);
		const expectedResult1 = macdKaelZhang.default(
			array,
			slow,
			fast,
			signal
		);

		// Act
		const actualResult1 = macd(array, fast, slow, signal, false);

		// Assert
		expect(actualResult1[0]).toStrictEqual(expectedResult1.MACD);
		expect(actualResult1[1]).toStrictEqual(expectedResult1.signal);
	}
});

test('@d3fc macd Test 1 Comprehensive', () => {
	// console.log('d3fc is', typeof d3fc, d3fc);
	// console.log(
	// 	'd3fc.indicatorMacd is',
	// 	typeof d3fc.indicatorMacd,
	// 	d3fc.indicatorMacd
	// );

	// const scaleFactor = 100000;
	// const fnRoundSlightly = (
	// 	n: number | undefined
	// ): number | undefined =>
	// 	typeof n === 'number'
	// 		? Math.round((n as number) * scaleFactor) / scaleFactor
	// 		: n;
	// const calculateDiff = (
	// 	element1: number | undefined,
	// 	element2: number | undefined
	// ): number => {
	// 	if (
	// 		typeof element1 === 'undefined' &&
	// 		typeof element2 === 'undefined'
	// 	) {
	// 		return 0;
	// 	} else if (
	// 		typeof element1 === 'undefined' ||
	// 		typeof element2 === 'undefined'
	// 	) {
	// 		return 1337;
	// 	} else {
	// 		return fnRoundSlightly(element1 - element2);
	// 	}
	// };
	// const fnFindDiff = (
	// 	array1: Array<number | undefined>,
	// 	array2: Array<number | undefined>
	// ): number => {
	// 	const diffs = pointwise(calculateDiff, array1, array2);

	// 	return diffs.findIndex((n) => n !== 0);
	// };

	const fnD3fc = d3fc.indicatorMacd();
	// Note ema fn is d3fc.indicatorExponentialMovingAverage();

	console.log('fnD3fc is', typeof fnD3fc, fnD3fc);

	fnD3fc.fastPeriod(fast);
	fnD3fc.slowPeriod(slow);
	fnD3fc.signalPeriod(signal);

	for (let i = 0; i < array1.length; i++) {
		// Arrange
		const array = array1.slice(i);
		const resultD3fc1 = fnD3fc(array);
		const expectedResultMacd1 = resultD3fc1.map(
			(datum: any) => datum.macd
		);
		// .map(fnRoundSlightly);
		const expectedResultSignal1 = resultD3fc1.map(
			(datum: any) => datum.signal
		);
		// .map(fnRoundSlightly);

		// Act
		const actualResult1 = macd(array, fast, slow, signal, true);
		const actualResultMacd1 = actualResult1[0].map(fnNaNToUndefined);
		// .map(fnRoundSlightly);
		const actualResultSignal1 = actualResult1[1].map(fnNaNToUndefined);
		// .map(fnRoundSlightly);

		// console.log(
		// 	'actualResultMacd1 is',
		// 	typeof actualResultMacd1,
		// 	actualResultMacd1.length,
		// 	actualResultMacd1
		// );
		// console.log(
		// 	'expectedResultMacd1 is',
		// 	typeof expectedResultMacd1,
		// 	expectedResultMacd1.length,
		// 	expectedResultMacd1
		// );

		// console.log(
		// 	'actualResultSignal1 is',
		// 	typeof actualResultSignal1,
		// 	actualResultSignal1.length,
		// 	actualResultSignal1
		// );
		// console.log(
		// 	'expectedResultSignal1 is',
		// 	typeof expectedResultSignal1,
		// 	expectedResultSignal1.length,
		// 	expectedResultSignal1
		// );

		// // Assert
		// expect(actualResultMacd1.length).toBe(
		// 	expectedResultMacd1.length
		// );
		// expect(
		// 	fnFindDiff(actualResultMacd1, expectedResultMacd1)
		// ).toBe(-1);
		expect(actualResultMacd1).toStrictEqual(expectedResultMacd1);

		// expect(actualResultSignal1.length).toBe(
		// 	expectedResultSignal1.length
		// );
		// expect(
		// 	fnFindDiff(actualResultSignal1, expectedResultSignal1)
		// ).toBe(-1);
		expect(actualResultSignal1).toStrictEqual(expectedResultSignal1);
	}
});
