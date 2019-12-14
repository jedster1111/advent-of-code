import { VectorPosition, createVector, Vector } from 'simple-vectors';
import { stringToInt } from '../common/stringToInt';

type IntersectionInfo = {
    position: Vector;
    steps: number;
};

export function calculateManhanttanDistance(a: VectorPosition, b: VectorPosition): number {
    return Math.abs(b.x) - Math.abs(a.x) + Math.abs(b.y) - Math.abs(a.y);
}

export const origin = createVector(0, 0);

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
    const numberOfSteps = stringToInt(instruction.slice(1));
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

function findIntersections(pointsTouched1: Vector[], pointsTouched2: Vector[]): IntersectionInfo[] {
    const visitedPointsBy1: { [vectorKey: string]: IntersectionInfo } = {};

    pointsTouched1.forEach((point, index) => {
        visitedPointsBy1[point.toString()] = { position: point, steps: index + 1 };
    });

    return pointsTouched2.reduce<IntersectionInfo[]>((accum, point, index) => {
        const intersection1Info = visitedPointsBy1[point.toString()];
        if (intersection1Info) return [...accum, { position: point, steps: index + intersection1Info.steps + 1 }];
        return accum;
    }, []);
}

export function findClosestIntersectionByDistance(intersections: IntersectionInfo[]): Vector {
    return intersections.reduce<Vector>((closest, current) => {
        const shortestDistanceSoFar = calculateManhanttanDistance(origin, closest);
        const currentDistance = calculateManhanttanDistance(origin, current.position);

        return currentDistance < shortestDistanceSoFar ? current.position : closest;
    }, intersections[0].position);
}

export function findClosestIntersectionBySteps(intersectionsInfo: IntersectionInfo[]): number {
    return intersectionsInfo.reduce((closest, current) => {
        return closest.steps < current.steps ? closest : current;
    }).steps;
}

export function getIntersections(instructionsString1: string, instructionsString2: string): IntersectionInfo[] {
    const instructions1 = getInstructions(instructionsString1).flatMap(parseInstruction);
    const instructions2 = getInstructions(instructionsString2).flatMap(parseInstruction);
    console.log('Got instructions');
    const pointsTouched1 = getPointsTouched(instructions1);
    const pointsTouched2 = getPointsTouched(instructions2);
    console.log('Got Points touched');
    const intersections = findIntersections(pointsTouched1, pointsTouched2);
    console.log('Got intersections');
    return intersections;
}
