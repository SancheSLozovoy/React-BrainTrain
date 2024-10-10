import { Link } from 'react-router-dom';
import './Settings.css';
import { Operator, SettingsProps } from '../../types/types';
import { useState } from 'react';
import { Input } from 'antd';

const DEFAULT_OPERATORS: Operator[] = [
    { symbol: '+', precedence: 1 },
    { symbol: '-', precedence: 1 },
    { symbol: '*', precedence: 2 },
    { symbol: '/', precedence: 2 },
]


const Settings: React.FunctionComponent = () => {
    const [allowedOperators, setAllowedOperators] = useState<Operator[]>(DEFAULT_OPERATORS)
    const [minNumber, setMinNumber] = useState<number>(10);
    const [maxNumber, setMaxNumber] = useState<number>(100);
    const [complexity, setComplexity] = useState<number>(3);
    const [time, setTime] = useState<number>(60);

    const handleChangeOperators = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        const operator = DEFAULT_OPERATORS.find(op => op.symbol === value);

        if (checked && operator) {
            if (!allowedOperators.some(op => op.symbol === operator.symbol)) {
                setAllowedOperators([...allowedOperators, operator]);
                setComplexity(prev => prev + 1);
            }
        } else if (!checked && operator) {
            setAllowedOperators(prev => prev.filter(op => op.symbol !== operator.symbol));
            setComplexity(prev => prev - 1);
        }
    };

    const handleStart = () => {
        const settings: SettingsProps = {
            allowedOperators,
            minNumber,
            maxNumber,
            timeLimit: time,
            complexity,
        }
        localStorage.setItem('gameSettings', JSON.stringify(settings))
    }

    return (
        <section className="settings">

            <div className="statistic__container">
                <h1 className="statistic__container-title">Статистика</h1>
                <span className="statistic__container-date"></span>
                <span className="statistic__container-score"></span>
            </div>

            <div className="settings__inner">
                <h1 className="settings__inner-title">Настройки</h1>
                <div className="settings__inner-chars">
                    <h2>Допустимые знаки</h2>
                    {DEFAULT_OPERATORS.map(operator => (
                        <label key={operator.symbol}>
                            <input
                                type="checkbox"
                                value={operator.symbol}
                                checked={allowedOperators.some(op => op.symbol === operator.symbol)}
                                onChange={handleChangeOperators}
                            />
                            {operator.symbol}
                        </label>
                    ))
                    }
                </div>
                <label htmlFor="input">
                    Минимальное число
                    <Input
                        min={minNumber}
                        max={maxNumber - 1}
                        defaultValue={1}
                        onChange={(e) => setMinNumber(Number(e.target.value))}
                    >
                    </Input>
                </label>
                <label htmlFor="input">
                    Максимальное число
                    <Input
                        min={minNumber + 1}
                        max={maxNumber}
                        defaultValue={100}
                        onChange={(e) => setMaxNumber(Number(e.target.value))}
                    >
                    </Input>
                </label>
                <label htmlFor="input">
                    Сложность
                    <Input
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={(e) => setComplexity(Number(e.target.value))}
                    >
                    </Input>
                </label>
                <label htmlFor="input">
                    Время
                    <Input
                        min={15}
                        defaultValue={60}
                        onChange={(e) => setTime(Number(e.target.value))}
                    >
                    </Input>
                </label>
                <Link to="/game">
                    <button onClick={handleStart} className="settings__inner-button">Начать игру</button>
                </Link>

            </div>
        </section>
    );
}

export default Settings;