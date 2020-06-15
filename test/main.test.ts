// thaw-macd/test/main.test.ts

'use strict';

// TODO:
// Install the npm packages '@d3fc/d3fc-technical-indicator' and 'macd' :
//
// 	"devDependencies": {
// 		"@d3fc/d3fc-technical-indicator": "^7.0.36",
// 		"macd": "^1.0.2"
// 	},

// import {
// 	indicatorExponentialMovingAverage,
// 	indicatorMacd //,
// 	// indicatorMovingAverage
// } from '@d3fc/d3fc-technical-indicator';

// const macdKaelZhang = require('macd');
// -> import * as macdKaelZhang from 'macd';

import {
	ema,
	macd,
	macdGetOneResult // , sma
} from '../lib/main';

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

// describe('Test 1 - EMA', () => {
// 	it('Rocks!', done => {
// 		// Arrange
// 		const period = 9;

// 		// Act
// 		const resultThaw = ema(array1, period, period);
// 		const fnD3fc = indicatorExponentialMovingAverage();

// 		fnD3fc.period(period);

// 		const resultD3fc = fnD3fc(array1);

// 		// console.log('macdThaw: result is', resultThaw);
// 		// console.log('d3fc: result is', resultD3fc);

// 		// Assert
// 		// test.expect(1);
// 		assert.deepEqual(resultThaw, resultD3fc);
// 		done();
// 	});
// });

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
