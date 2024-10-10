export interface Operator {
    symbol: string; 
    precedence: number; 
}

export interface SettingsProps {
    allowedOperators: Operator[]; 
    minNumber: number;
    maxNumber: number;
    timeLimit: number; 
    complexity: number; 
}


export interface GameStatistic {
    date: string; 
    correctAnswers: number; 
}


export interface ProgressbarProps {
    progress: number; 
}

export interface GameExample {
    operands: number[]; 
    operators: Operator[]; 
    target: number;
}

export interface UserInput {
    answers: number[]; 
}

export interface HeaderProps {
    gameId: number;
}
