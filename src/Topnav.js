import github from './images/github.png';
import instagram from './images/instagram.png';
import logo from './images/myLogo.png';
import './App.css';

function Topnav() {
    return (
        <div className="topnav">
            <a href="/" rel="noopener noreferrer">
                <img className="App-logo" src={logo} alt="xyntechx"/>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
                href="https://github.com/xyntechx"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="App-logo" src={github} alt="GitHub"/>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
                href="https://www.instagram.com/xyntechx/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img className="App-logo" src={instagram} alt="Instagram"/>
            </a>
        </div>
    )
}

export default Topnav;