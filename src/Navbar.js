import './App.css';
import github from './images/github.png';
import instagram from './images/instagram.png';
import fiverr from './images/fiverr.png';
import linkedin from './images/linkedin.png';
import email from './images/email.png';
import xyntechx from './images/xyntechx.png'

function Navbar() {
    return (
        <div className="box-container" style={{backgroundColor:'#F5F5F5', paddingTop:'0px', paddingBottom:'0px'}}>
            <div className='nav-bar'>
                <img style={{height:'100px'}} src={xyntechx} alt="Xyntechx"/>
                <p>Stay Hungry | Stay Foolish</p>
                <p></p>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:'20px', textAlign: 'center'}}>
                    <a
                        href="https://github.com/xyntechx"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="App-logo" src={github} alt="GitHub"/>
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                        href="https://www.instagram.com/xyntechx/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="App-logo" src={instagram} alt="Instagram"/>
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                        href="https://www.fiverr.com/share/zz3bDg"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="App-logo" src={fiverr} alt="Fiverr"/>
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                        href="https://www.linkedin.com/in/nyx-iskandar/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="App-logo" src={linkedin} alt="Linkedin"/>
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="mailto:xyntechx@gmail.com">
                        <img className="App-logo" src={email} alt="Email"/>
                    </a>
                </div>
                <p></p>
                <p style={{fontSize:'20px'}}>Programmed and Designed by Nyx Iskandar</p>
            </div>
        </div>
    )
}

export default Navbar;
