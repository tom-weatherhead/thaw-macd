// thaw-macd/src/main.ts

'use strict';

import {
	cascade,
	createNaNArray,
	getLastElementOfArray,
	isNumber,
	mean
} from 'thaw-common-utilities.ts';

// Note: We could steal from these two projects:
// https://github.com/jonschlinkert/is-number.git
// https://github.com/jonschlinkert/kind-of.git
// ... and replace isNumber with z, where:
// y=n=>typeof n,z=n=>!((y(n)==='string'&&!n.trim())||y(n)!=='number')&&(n-n+1)>=0
// Also, why not replace (n-n+1)>=0 with (n-n+1)>0 ?

// function isNumber(n: unknown): boolean {
// 	return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n);
// }

// EMA: Exponential moving average
// See Gerald Appel's book 'Technical Analysis - Power Tools for Active Investors', chapter 6, pp. 134-137

// The core of the EMA algorithm. It expects the seed to be provided.

export function emaCore(
	array: number[],
	period: number,
	seed: number
): number[] {
	const alpha = 2 / (period + 1); // The smoothing constant (Appel p. 134)

	return [seed].concat(
		cascade(
			(cascadeSeed: number, element: number) =>
				!isNumber(cascadeSeed)
					? element
					: alpha * element + (1 - alpha) * cascadeSeed,
			seed,
			array
		)
	);
}

export function ema(
	array: number[],
	period: number,
	seedLength = 1
): number[] {
	let i = array.findIndex(isNumber);

	if (i < 0) {
		i = array.length;
	}

	const j = Math.min(i + seedLength - 1, array.length);

	i = Math.max(i, j);

	const resultArray = createNaNArray(i);
	// meanValue is the initial value which stabilizes the exponential average.
	// It is the simple average of the first seedLength values in the array,
	// after skipping any initial run of invalid values (e.g. NaN)
	// See the section 'Stabilizing the Exponential Average' (Appel p. 136)
	const meanValue = mean(
		array.slice(i + 1 - seedLength, i + 1).filter(isNumber)
	);

	return resultArray
		.concat(emaCore(array.slice(i + 1), period, meanValue))
		.slice(0, array.length);
}

export function macd(
	array: number[],
	fastPeriod = 12,
	slowPeriod = 26,
	signalPeriod = 9,
	usePeriodAsSeedLength = false
	// ): [number[], number[]] {
): { line: number[]; signal: number[] } {
	// When usePeriodAsSeedLength is falsy, this algorithm behaves like the npm package 'macd' written by Kael Zhang.
	// When usePeriodAsSeedLength is truthy, this algorithm behaves like indicatorMacd in the npm package '@d3fc/d3fc-technical-indicator'.

	// I.e. return ema(array, fastPeriod) - ema(array, slowPeriod);

	const fnEmaHelper = (a: number[], p: number): number[] =>
		ema(a, p, usePeriodAsSeedLength ? p : 1);
	const fastEma = fnEmaHelper(array, fastPeriod);
	const slowEma = fnEmaHelper(array, slowPeriod);
	// const macdArray = fastEma.map((f: number, i: number): number =>
	// 	isNumber(f) && isNumber(slowEma[i]) ? f - slowEma[i] : NaN
	// );
	const macdArray = fastEma.map(
		(f: number, i: number): number => f - slowEma[i]
	);
	const signalArray = fnEmaHelper(macdArray, signalPeriod);

	// return [macdArray, signalArray];

	return { line: macdArray, signal: signalArray };
}

export function macdGetOneResult(
	array: number[],
	fastPeriod = 12,
	slowPeriod = 26,
	signalPeriod = 9,
	usePeriodAsSeedLength = false
	// ): [number, number] {
): { line: number; signal: number } {
	// const [macds, signals] = macd(
	const macdResult = macd(
		array,
		fastPeriod,
		slowPeriod,
		signalPeriod,
		usePeriodAsSeedLength
	);

	// return [
	// 	getLastElementOfArray(macds) || NaN,
	// 	getLastElementOfArray(signals) || NaN
	// ];

	return {
		line: getLastElementOfArray(macdResult.line) || NaN,
		signal: getLastElementOfArray(macdResult.signal) || NaN
	};
}
