export interface HeaderProps {
    gameId: number;
}

export interface Operator {
    symbol: string;
    precedence: number;
}

export interface SettingsProps{
    operators: Operator[];
    minNumber: number;
    maxNumber: number;
    difficult: number;
    time: number;
}

export interface GameStatistic{
    date: string;
    result: number;
}

export interface ProgressbarProps{
    progress: number;
}

export interface GameExample{
    firstOperand: number;
    secondOperand: number;
    target: number;
    operator: Operator;
}

export interface UserInput{
    firstInput: number | '';
    secondInput: number | '';
}

