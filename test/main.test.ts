// thaw-macd/test/main.test.ts

'use strict';

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

// test('KaelZhang ema Test 1', () => {
// 	// Arrange
// 	const period = 9;

// 	// Act
// 	const resultThaw = ema(array1, period, period).map(fnNaNToUndefined);
// 	const fnD3fc = d3fc.indicatorExponentialMovingAverage();

// 	fnD3fc.period(period);

// 	const resultD3fc = fnD3fc(array1);

// 	// console.log('macdThaw: result is', resultThaw);
// 	// console.log('d3fc: result is', resultD3fc);

// 	// Assert
// 	// test.expect(1);
// 	// assert.deepEqual(resultThaw, resultD3fc);
// 	expect(resultThaw).toStrictEqual(resultD3fc);
// });

test('@d3fc ema Test 1', () => {
	// Arrange
	const period = 9;

	// Act
	const resultThaw = ema(array1, period, period).map(fnNaNToUndefined);
	const fnD3fc = d3fc.indicatorExponentialMovingAverage();

	fnD3fc.period(period);

	const resultD3fc = fnD3fc(array1);

	// Assert
	// test.expect(1);
	expect(resultThaw).toStrictEqual(resultD3fc);
});

test('EMA test', () => {
	// Arrange
	// Act
	const emaArray = ema(array1, 9);

	// Assert
	expect(emaArray).toBeTruthy();
});

test('macdGetOneResult test', () => {
	// Arrange
	// Act
	const macdResult = macdGetOneResult(array1);

	// Assert
	expect(macdResult.line).toBeTruthy();
	expect(macdResult.signal).toBeTruthy();
});

test('KaelZhang macd Test 1 Comprehensive', () => {
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
		expect(actualResult1.line).toStrictEqual(expectedResult1.MACD);
		expect(actualResult1.signal).toStrictEqual(expectedResult1.signal);
	}
});

test('@d3fc macd Test 1 Comprehensive', () => {
	const fnD3fc = d3fc.indicatorMacd();
	// Note: ema fn is d3fc.indicatorExponentialMovingAverage();

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
		const expectedResultSignal1 = resultD3fc1.map(
			(datum: any) => datum.signal
		);

		// Act
		const actualResult1 = macd(array, fast, slow, signal, true);
		const actualResultMacd1 = actualResult1.line.map(fnNaNToUndefined);
		const actualResultSignal1 = actualResult1.signal.map(
			fnNaNToUndefined
		);

		// Assert
		expect(actualResultMacd1).toStrictEqual(expectedResultMacd1);
		expect(actualResultSignal1).toStrictEqual(expectedResultSignal1);
	}
});
