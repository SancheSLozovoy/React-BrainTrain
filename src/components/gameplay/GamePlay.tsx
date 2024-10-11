import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { GameExample } from "../../types/types";
import { generateSolvableExample } from "../utils/generateExample";
import { evaluateExpression } from "../utils/generateExample";
import './GamePlay.css'

const GamePlay: React.FC = () => {
    const [gameId, setGameId] = useState<number | null>(null);
    const [gameExample, setGameExample] = useState<GameExample | null>(null);
    const [userInput, setUserInput] = useState<string[]>([]);
    const [feedBack, setFeedBack] = useState<string | null>(null);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [gameResult, setGameResult] = useState<number>(0); 

    useEffect(() => {
        const createNewGameId = () => {
            const storedGameId = localStorage.getItem('gameId');
            const newGameId = storedGameId ? Number(storedGameId) + 1 : 1;
            localStorage.setItem('gameId', newGameId.toString());
            return newGameId;
        };

        setGameResult(0);
        localStorage.setItem('gameResult', '0');

        const newGameId = createNewGameId();
        setGameId(newGameId);

        const example = generateSolvableExample();
        if (example) {
            setGameExample(example);
            localStorage.setItem('currentExample', JSON.stringify(example));
            setUserInput(Array(example.operands.length).fill(''));
        } else {
            alert("Не удалось сгенерировать пример. Попробуйте изменить настройки.");
        }
    }, []);

    const handleInputChange = (index: number, value: string) => {
        const updatedInput = [...userInput];
        updatedInput[index] = value;
        setUserInput(updatedInput);
    }

    const handleCheck = () => {
        if (!gameExample) {
            setFeedBack("Пример не сгенерирован");
            return;
        }

        for (let input of userInput) {
            if (input.trim() === '') {
                setFeedBack('Заполните все поля');
                return;
            }
        }

        const userValues = userInput.map(num => Number(num));

        try {
            const result = evaluateExpression(userValues, gameExample.operators);
            if (result === gameExample.target) {
                const newGameResult = gameResult + 1;
                setGameResult(newGameResult);
                localStorage.setItem('gameResult', newGameResult.toString()); 

                let alternativeSolution = `${gameExample.operands[0]}`;
                for (let i = 0; i < gameExample.operators.length; i++) {
                    alternativeSolution += ` ${gameExample.operators[i].symbol} ${gameExample.operands[i + 1]}`;
                }

                setFeedBack(`Правильно! Еще можно было вот так: ${alternativeSolution}`);

                const nextExample = generateSolvableExample();
                if (nextExample) {
                    setGameExample(nextExample);
                    setUserInput(userInput.map(input => input = ''));
                    localStorage.setItem('currentExample', JSON.stringify(nextExample));
                }
            } else {
                setFeedBack(`Неправильно, твой результат: ${result}, а надо ${gameExample.target}`);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleTimeOver = () => {
        setIsGameOver(true);
        setFeedBack("Время вышло! Игра окончена.");
    }

    return (
        <div>
            <section className="game">
                {!isGameOver ? (
                    <>
                        {gameId !== null && <Header gameId={gameId} onTimeOver={handleTimeOver} />}
                    </>
                ) : (
                    <div></div>
                )}

                <div className="game__content">
                    {!isGameOver ? (
                        <>
                            {gameExample && (
                                <div className="example">
                                    <div className="expression">
                                        {gameExample.operands.map((_, index) => (
                                            <span key={index}>
                                                <input
                                                    type="number"
                                                    value={userInput[index]}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    className="operand-input"
                                                />
                                                {index < gameExample.operators.length && (
                                                    <span className="operator"> {gameExample.operators[index].symbol} </span>
                                                )}
                                            </span>
                                        ))}
                                        <span className="equals"> = {gameExample.target}</span>
                                    </div>
                                    <button onClick={handleCheck} className="check-button">Проверить</button>
                                    {feedBack && <div className={`feedback ${feedBack.includes("Правильно") ? "success" : "error"}`}>{feedBack}</div>}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="game-over">
                            <h2>{feedBack}</h2>
                            <button onClick={() => window.location.reload()}>Начать заново</button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default GamePlay;
