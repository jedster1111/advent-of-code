import { part1Program } from './data';
import { parseIntCodeProgram, parseProgramString } from './programLogic';
import chalk from 'chalk';

const result = parseIntCodeProgram(parseProgramString(part1Program));

console.log(`Result is ${chalk.underline(result)}`);
