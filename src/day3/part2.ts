import chalk = require('chalk');
import { instructions1, instructions2 } from './data';
import { getIntersections, findClosestIntersectionBySteps as findShortestNumberOfSteps } from './logic';

function main(instructionsString1: string, instructionsString2: string): number {
    console.log('Starting');

    const intersections = getIntersections(instructionsString1, instructionsString2);

    return findShortestNumberOfSteps(intersections);
}

console.log(
    `The shortest number of steps to an intersection is ${chalk.underline(
        main(instructions1, instructions2),
    )} steps away!`,
);
