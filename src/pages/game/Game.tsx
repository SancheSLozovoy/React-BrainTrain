import { useState, useEffect } from "react";
import Header from "../../components/header/Header";

const Game: React.FunctionComponent = () => {
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
        <section className="game">
            {gameId !== null && <Header gameId={gameId} />}
            <div className="game__content">
            </div>
        </section>
    );
}

export default Game;