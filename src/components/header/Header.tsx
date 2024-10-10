import Progressbar from "../progressbar/Progressbar";
import { Link } from 'react-router-dom';
import './Header.css'
import { HeaderProps } from "../../types/types";


const Header: React.FC<HeaderProps> = ({gameId}) => {
    return (
        <header className="header">
            <Progressbar></Progressbar>
            <div className="game__content-number">Game ID: {gameId}</div>
            <Link to="/">
                <button className="game__content-button">Back</button>
            </Link>
        </header>
    )
}

export default Header;