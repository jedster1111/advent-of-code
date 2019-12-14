import sum from './sum';
import multiply from './multiply';
import { stringToInt } from './stringToInt';
type OperationTypes = 'add' | 'multiply' | 'end';

const getOpcodePos = (currentProgramIndex: number): number => currentProgramIndex * 4;

const opcodeMap: {
    [opcode: number]: OperationTypes;
} = {
    1: 'add',
    2: 'multiply',
    99: 'end',
};

function getOpcodeInfo(
    program: number[],
    currentProgramIndex: number,
): {
    operationType: OperationTypes;
    aPos: number;
    bPos: number;
    resultPos: number;
} {
    const opcodePos = getOpcodePos(currentProgramIndex);
    const opcode = program[opcodePos];

    return {
        operationType: opcodeMap[opcode] ?? 'end',
        aPos: program[opcodePos + 1],
        bPos: program[opcodePos + 2],
        resultPos: program[opcodePos + 3],
    };
}

export function parseProgramString(programString: string): number[] {
    return programString.split(',').map(stringToInt);
}

export function parseIntCodeProgram(program: number[]): number {
    let currentProgramIndex = 0;
    while (true) {
        const { aPos, bPos, operationType, resultPos } = getOpcodeInfo(program, currentProgramIndex);

        if (operationType === 'end') return program[0];
        if (operationType === 'add') program[resultPos] = sum(program[aPos], program[bPos]);
        else if (operationType === 'multiply') program[resultPos] = multiply(program[aPos], program[bPos]);

        currentProgramIndex++;
    }
}
