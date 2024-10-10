import { Link } from 'react-router-dom';
import './Settings.css';
import { Operator, SettingsProps } from '../../types/types';

const DEFAULT_OPERATORS: Operator[] = [
    {symbol: '+', precedence: 1},
    {symbol: '-', precedence: 1},
    {symbol: '*', precedence: 2},
    {symbol: '/', precedence: 2},
]


const Settings: React.FunctionComponent = () => {
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
                            />
                            {operator.symbol}
                        </label>
                    ))
                    }
                </div>
                <label htmlFor="input">
                    Минимальное число
                    <input defaultValue={10} type="number"></input>
                </label>
                <label htmlFor="input">
                    Максимальное число
                    <input defaultValue={100} type="number"></input>
                </label>
                <label htmlFor="input">
                    Сложность
                    <input defaultValue={1} type="number"></input>
                </label>
                <label htmlFor="input">
                    Время
                    <input defaultValue={60} type="number"></input>
                </label>
                <Link to="/game">
                    <button className="settings__inner-button">Начать игру</button>
                </Link>

            </div>
        </section>
    );
}

export default Settings;