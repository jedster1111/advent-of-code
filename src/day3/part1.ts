import { VectorPosition, createVector, Vector } from 'simple-vectors';
import chalk = require('chalk');
import { instructions1, instructions2, example1, example2, example3, example4 } from './data';

function calculateManhanttanDistance(a: VectorPosition, b: VectorPosition): number {
    return Math.abs(b.x) - Math.abs(a.x) + Math.abs(b.y) - Math.abs(a.y);
}

const origin = createVector(0, 0);

const directionToVectorMap = {
    U: createVector(0, 1),
    R: createVector(1, 0),
    D: createVector(0, -1),
    L: createVector(-1, 0),
};

type Directions = keyof typeof directionToVectorMap;

function isDirection(direction: string): direction is Directions {
    return ['U', 'R', 'D', 'L'].includes(direction);
}

function getInstructions(instructions: string): string[] {
    return instructions.split(',');
}

function parseInstruction(instruction: string): Vector[] {
    const direction = instruction[0];
    if (!isDirection(direction)) throw new Error(`'${direction}' isn't one of 'U', 'R', 'D', 'L'`);
    const numberOfSteps = parseInt(instruction.slice(1));
    if (isNaN(numberOfSteps))
        throw new Error(`Number of steps was not a number. Expected a number, recieved: ${instruction.slice(1)}`);

    return Array(numberOfSteps).fill(directionToVectorMap[direction]);
}

function getPointsTouched(instructions: Vector[]): Vector[] {
    return instructions.reduce<Vector[]>((accum, instruction) => {
        if (accum.length === 0) return [instruction];
        accum.push(instruction.add(accum[accum.length - 1]));
        return accum;
    }, []);
}

function findIntersections(pointsTouched1: Vector[], pointsTouched2: Vector[]): Vector[] {
    const visitedPointsBy1: { [vectorKey: string]: Vector } = {};

    pointsTouched1.forEach(point => {
        visitedPointsBy1[point.toString()] = point;
    });

    return pointsTouched2.reduce<Vector[]>((accum, point) => {
        if (visitedPointsBy1[point.toString()]) return [...accum, point];
        return accum;
    }, []);
}

function findClosestIntersection(intersections: Vector[]): Vector {
    return intersections.reduce((closest, current) => {
        const shortestDistanceSoFar = calculateManhanttanDistance(origin, closest);
        const currentDistance = calculateManhanttanDistance(origin, current);

        return currentDistance < shortestDistanceSoFar ? current : closest;
    });
}

function main(instructionsString1: string, instructionsString2: string): number {
    console.log('Starting');

    const instructions1 = getInstructions(instructionsString1).flatMap(parseInstruction);
    const instructions2 = getInstructions(instructionsString2).flatMap(parseInstruction);
    console.log('Got instructions');

    const pointsTouched1 = getPointsTouched(instructions1);
    const pointsTouched2 = getPointsTouched(instructions2);
    console.log('Got Points touched');

    const intersections = findIntersections(pointsTouched1, pointsTouched2);
    console.log('Got intersections');

    const closestIntersection = findClosestIntersection(intersections);
    console.log('Got closest intersection');

    return calculateManhanttanDistance(origin, closestIntersection);
}

console.log(
    `The closest intersection point is a distance of ${chalk.underline(main(instructions1, instructions2))} away!`,
);
