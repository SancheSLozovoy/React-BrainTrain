import { useState, useEffect } from "react";
import Header from "../../components/header/Header";

const GamePlay: React.FC = () => {

    const [gameId, setGameId] = useState<number | null>(null);

    useEffect(() => {
        const storedGameId = localStorage.getItem('gameId');
        if (storedGameId && !isNaN(Number(storedGameId))) {
            setGameId(Number(storedGameId));
        } else {

            const newGameId = 1;
            localStorage.setItem('gameId', newGameId.toString());
            setGameId(newGameId);
        }
    }, []);

    return (
    <div>
        <section className="game">
            {gameId !== null && <Header gameId={gameId} />}
            <div className="game__content">
            </div>
        </section>
    </div>);
}

export default GamePlay;