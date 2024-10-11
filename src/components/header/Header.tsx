import { useState, useEffect } from "react";
import Progressbar from "../progressbar/Progressbar";
import { Link } from 'react-router-dom';
import './Header.css'
import { HeaderProps } from "../../types/types";
import { SettingsProps } from "../../types/types";

const Header: React.FC<HeaderProps> = ({ gameId, onTimeOver }) => {
    const [time, setTime] = useState<number | null>(null);

    const getTime = () => {
        const storeSetting = localStorage.getItem('gameSettings');
        
        if (!storeSetting) {
            console.error('Настройки не найдены');
            return null;
        }

        const settings: SettingsProps = JSON.parse(storeSetting);
        const { timeLimit } = settings;

        return timeLimit || 60;
    }

    useEffect(() => {
        const initialTime = getTime();
        if (initialTime) {
            setTime(initialTime);

            const timer = setInterval(() => {
                setTime(prev => {
                    if (prev !== null && prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        onTimeOver(); 
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [onTimeOver]);

    return (
        <header className="header">
            {time !== null && <Progressbar progress={time}></Progressbar>}
            <div className="game__content-number">Game ID: {gameId}</div>
            <Link to="/">
                <button className="game__content-button">Back</button>
            </Link>
        </header>
    );
}

export default Header;
