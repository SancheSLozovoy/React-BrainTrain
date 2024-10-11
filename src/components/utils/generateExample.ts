import { Operator, SettingsProps } from "../../types/types";

const MAX_ATTEMP = 100;

export const evaluateExpression = (operands: number[], operators: Operator[]): number => {
    let currOperands = [...operands];
    let currOperators = [...operators];

    for (let i = 0; i < currOperators.length; i++) {
        if (currOperators[i].symbol === '*' || currOperators[i].symbol === '/') {
            const leftOper = currOperands[i];
            let rightOper = currOperands[i + 1];
            let result: number;

            if (currOperators[i].symbol === '*') {
                result = leftOper * rightOper;
            } else {
                if (rightOper === 0) {
                    rightOper = 1
                    throw new Error("Деление на ноль");
                }
                result = leftOper / rightOper;
            }

            currOperands.splice(i, 1, result);
            currOperands.splice(i + 1, 1);
            currOperators.splice(i, 1);
            i--;
        }
    }

    let finalResult = currOperands[0];
    for (let i = 0; i < currOperators.length; i++) {
        const operator = currOperators[i];
        const rightOperand = currOperands[i + 1];

        if (operator.symbol === '+') {
            finalResult += rightOperand;
        } else if (operator.symbol === '-') {
            finalResult -= rightOperand;
        }
    }

    return finalResult;
}

export const generateSolvableExample = () => {
    const storeSetting = localStorage.getItem('gameSettings');
    if (!storeSetting) {
        console.error('Настройки не найдены');
        return null;
    }

    const settings: SettingsProps = JSON.parse(storeSetting);
    const { allowedOperators, maxNumber, minNumber, complexity } = settings;

    if (allowedOperators.length === 0) {
        console.error("Нет доступных операторов");
        return null;
    }

    for (let att = 0; att < MAX_ATTEMP; att++) {
        const operators: Operator[] = [];

        const numberOfOperators = complexity > 0 ? complexity : 1; 
        const numberOfOperands = numberOfOperators + 1; 

        for (let i = 0; i < numberOfOperators; i++) {
            const randomOp = allowedOperators[Math.floor(Math.random() * allowedOperators.length)];
            operators.push(randomOp);
        }

        const operands: number[] = [];
        for (let i = 0; i < numberOfOperands; i++) {
            const operand = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
            operands.push(operand);
            
        }
        console.log(operands);

        try {
            const result = evaluateExpression(operands, operators);
            console.log(result)
            if (
                Number.isInteger(result)
            ) {
                return {
                    operands,
                    operators,
                    target: result,
                };
            }
        } catch (error) {
            console.error("Ошибка вычисления", error);
            continue;
        }
    }

    return null;
}