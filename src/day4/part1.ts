import chalk = require('chalk');
import {
    doDigitsAlwaysIncrease,
    areThereAdjacentDigits,
    isSixDigits,
    findValidPasswords,
    digitsFromNumber,
} from './logic';

function isValidPassword(password: number): boolean {
    const digits = digitsFromNumber(password);
    const digitsAlwaysIncrease = doDigitsAlwaysIncrease(digits);
    const digitsAreAdjacent = areThereAdjacentDigits(digits);
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
