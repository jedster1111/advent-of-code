import { parseIntCodeProgram, parseProgramString } from './part1';
import { part1Program } from './data';

function findNounAndVerb(): [number, number] {
    const target = 19690720;
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            const program = parseProgramString(part1Program);
            program[1] = noun;
            program[2] = verb;
            if (parseIntCodeProgram(program) === target) return [noun, verb];
        }
    }

    throw new Error('No solutions were found?!?!?');
}

const [noun, verb] = findNounAndVerb();

console.log(`Noun is ${noun} and verb is ${verb}`);
console.log(`Answer is ${noun * 100 + verb}`);
