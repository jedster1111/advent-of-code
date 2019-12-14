import { stringToInt } from '../common/stringToInt';

export function digitsFromNumber(number: number): number[] {
    return [...number.toString()].map(stringToInt);
}

export function doDigitsAlwaysIncrease(digits: number[]): boolean {
    let last: number | undefined = undefined;
    for (const digit of digits) {
        if (last !== undefined && digit < last) return false;
        last = digit;
    }
    return true;
}

export function areThereAdjacentDigits(digits: number[]): boolean {
    let last: number | undefined = undefined;
    for (const digit of digits) {
        if (last === digit) return true;
        last = digit;
    }
    return false;
}

export function areThereOnlyTwoAdjacentDigits(digits: number[]): boolean {
    let last: number | undefined = undefined;
    for (let i = 0; i < digits.length; i++) {
        const digit = digits[i];
        if (last === digit && digits[i + 1] !== digit && digits[i - 2] !== digit) return true;
        last = digit;
    }
    return false;
}

export function isSixDigits(digits: number[]): boolean {
    return digits.length === 6;
}

export function findValidPasswords(
    lowerBound: number,
    upperBound: number,
    isValidFunc: (password: number) => boolean,
): number[] {
    const result: number[] = [];
    for (let i = lowerBound; i <= upperBound; i++) {
        if (isValidFunc(i)) result.push(i);
    }

    return result;
}
