import Progressbar from "../progressbar/Progressbar";
import { Link } from 'react-router-dom';
import './Header.css'
import { HeaderProps } from "../../types/types";


const Header: React.FC<HeaderProps> = ({gameId}) => {

    const time = 60;

    return (
        <header className="header">
            <Progressbar progress={time}></Progressbar>
            <div className="game__content-number">Game ID: {gameId}</div>
            <Link to="/">
                <button className="game__content-button">Back</button>
            </Link>
        </header>
    )
}

export default Header;