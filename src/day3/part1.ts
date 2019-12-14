import chalk = require('chalk');
import { instructions1, instructions2 } from './data';
import { getIntersections, findClosestIntersectionByDistance, calculateManhanttanDistance, origin } from './logic';

function main(instructionsString1: string, instructionsString2: string): number {
    console.log('Starting');

    const intersections = getIntersections(instructionsString1, instructionsString2);

    const closestIntersection = findClosestIntersectionByDistance(intersections);
    console.log('Got closest intersection');

    return calculateManhanttanDistance(origin, closestIntersection);
}

console.log(
    `The closest intersection point is a distance of ${chalk.underline(main(instructions1, instructions2))} away!`,
);
