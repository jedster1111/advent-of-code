import { parseIntCodeProgram, parseProgramString } from './programLogic';
import { part1Program } from './data';
import { performance } from 'perf_hooks';
import chalk = require('chalk');

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

const t0 = performance.now();
const [noun, verb] = findNounAndVerb();
const t1 = performance.now();

console.log(`Solution found in ${((t1 - t0) / 1000).toFixed(2)}s`);

console.log(`Noun is ${chalk.underline(noun)} and verb is ${chalk.underline(verb)}`);
console.log(`Answer to problem (${chalk.italic('noun * 100 + verb')}) is ${chalk.underline(noun * 100 + verb)}`);
