// thaw-macd/src/main.ts

'use strict';

import { createArrayFromElement, mean } from 'thaw-common-utilities.ts';

// Note: We could steal from these two projects:
// https://github.com/jonschlinkert/is-number.git
// https://github.com/jonschlinkert/kind-of.git
// ... and replace isNumber with z, where:
// y=n=>typeof n,z=n=>!((y(n)==='string'&&!n.trim())||y(n)!=='number')&&(n-n+1)>=0
// Also, why not replace (n-n+1)>=0 with (n-n+1)>0 ?

function isNumber(n: any): boolean {
	return typeof n === 'number' && !Number.isNaN(n) && Number.isFinite(n);
}

// SMA: Simple moving average

// export function sma(array: number[], period: number): number[] {
// 	// ThAW 2019-06-27 : This implementation has not yet been verified as correct:

// 	// return mean(array.slice(0, period).filter(isNumber));

// 	return array.map((value, i) => mean(array.slice(Math.max(i - period + 1, 0), period).filter(isNumber)))
// }

// EMA: Exponential moving average
// See Gerald Appel's book 'Technical Analysis - Power Tools for Active Investors', chapter 6, pp. 134-137

export function ema(
	array: number[],
	period: number,
	seedLength = 1
): number[] {
	const alpha = 2 / (period + 1); // The smoothing constant (Appel p. 134)
	let i = array.findIndex(isNumber);

	if (i < 0) {
		i = array.length;
	}

	const j = Math.min(i + seedLength - 1, array.length);

	i = Math.max(i, j);

	const resultArray = createArrayFromElement(NaN, i) || [];
	// meanValue is the initial value which stabilizes the exponential average.
	// It is the simple average of the first seedLength values in the array,
	// after skipping any initial run of invalid values (e.g. NaN)
	// See the section 'Stabilizing the Exponential Average' (Appel p. 136)
	const meanValue = mean(
		array.slice(i + 1 - seedLength, i + 1).filter(isNumber)
	);
	let result = meanValue;

	// a.concat(b) appends the elements in b to the end of a.
	return resultArray.concat(
		[meanValue],
		array.slice(i + 1).map((element: number): number => {
			if (!isNumber(result)) {
				result = element;
			} else if (isNumber(element)) {
				result = alpha * element + (1 - alpha) * result;
			} // else: result is not modified

			return result;
		})
	);
}

export function macd(
	array: number[],
	fastPeriod = 12,
	slowPeriod = 26,
	signalPeriod = 9,
	usePeriodAsSeedLength = false
): [number[], number[]] {
	// When usePeriodAsSeedLength is falsy, this algorithm behaves like the npm package 'macd' written by Kael Zhang.
	// When usePeriodAsSeedLength is truthy, this algorithm behaves like indicatorMacd in the npm package '@d3fc/d3fc-technical-indicator'.

	// return ema(array, fastPeriod) - ema(array, slowPeriod);

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

	return [macdArray, signalArray];
}

export function macdGetOneResult(
	array: number[],
	fastPeriod = 12,
	slowPeriod = 26,
	signalPeriod = 9,
	usePeriodAsSeedLength = false
): [number, number] {
	const [macds, signals] = macd(
		array,
		fastPeriod,
		slowPeriod,
		signalPeriod,
		usePeriodAsSeedLength
	);

	return [macds[macds.length - 1], signals[signals.length - 1]];
}
