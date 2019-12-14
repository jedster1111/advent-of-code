import chalk = require('chalk');
import { doDigitsAlwaysIncrease, isSixDigits, findValidPasswords, areThereOnlyTwoAdjacentDigits } from './logic';

function isValidPassword(password: number): boolean {
    const digits = [...password.toString()].map(digit => parseInt(digit, 10));
    const digitsAlwaysIncrease = doDigitsAlwaysIncrease(digits);
    const digitsAreAdjacent = areThereOnlyTwoAdjacentDigits(digits);
    const lengthIsSixDigits = isSixDigits(digits);

    return digitsAlwaysIncrease && digitsAreAdjacent && lengthIsSixDigits;
}

const lowerBound = 134564;
const upperBound = 585159;

console.log(
    `Between ${lowerBound} & ${upperBound} there are ${chalk.underline(
        findValidPasswords(lowerBound, upperBound, isValidPassword).length,
    )} valid passwords!`,
);