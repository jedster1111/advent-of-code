import roundDown from '../common/roundDown';
import sum from '../common/sum';
import { moduleMasses } from './data';

function findFuelRequiredForMass(mass: number): number {
    const fuelRequired = roundDown(mass / 3) - 2;
    return fuelRequired <= 0 ? 0 : fuelRequired + findFuelRequiredForMass(fuelRequired);
}

function findFuelRequiredByModules(moduleMasses: number[]): number {
    return moduleMasses.map(findFuelRequiredForMass).reduce(sum);
}

const fuelRequired = findFuelRequiredByModules(moduleMasses);

console.log(`Fuel required is ${fuelRequired}`);
