import github from './images/github.png';
import instagram from './images/instagram.png';
import fiverr from './images/fiverr.png';
import './App.css';

function Topnav() {
    return (
        <div className="topnav">
            <a
                href="https://github.com/xyntechx"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="App-logo" src={github} alt="GitHub"/>
            </a>
            &nbsp;&nbsp;
            <a
                href="https://www.instagram.com/xyntechx/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="App-logo" src={instagram} alt="Instagram"/>
            </a>
            &nbsp;&nbsp;
            <a
                href="https://www.fiverr.com/share/zz3bDg"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="App-logo" src={fiverr} alt="Fiverr"/>
            </a>
        </div>
    )
}

export default Topnav;
