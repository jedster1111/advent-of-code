import roundDown from '../common/roundDown';
import sum from '../common/sum';
import { moduleMasses } from './data';

function findFuelRequiredForModule(mass: number): number {
    return roundDown(mass / 3) - 2;
}

function findFuelRequiredByModules(moduleMasses: number[]): number {
    return moduleMasses.map(findFuelRequiredForModule).reduce(sum);
}

const fuelRequired = findFuelRequiredByModules(moduleMasses);

console.log(`Fuel required is ${fuelRequired}`);
