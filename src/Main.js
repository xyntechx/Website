import github from './images/github.png';
import instagram from './images/instagram.png';
import logo from './images/myLogo.png';
import me from './images/me.png'
import About from './About';
import Challenges from './Challenges';
import Projects from './Projects';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

function renderMain() {
    return (
    <div className="App">
        <body className="App-body">

            <p></p>
            <p></p>

            <p>Hello! I am</p>
            <h1 className="App-heading" style={{textAlign:'center'}}>Nyx Iskandar</h1>

            <p></p>

            <img style={{height:'500px'}} src={me} alt="Me"/>

            <p></p>

            <div class="module-border-wrap">
                <div class="module" style={{textAlign:'center'}}>
                    <p>Student | Programmer | Game Developer | Web Developer</p>
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>
            <p></p>

            <div className="App-link-container">
            <a
                href="/about"
                rel="noopener noreferrer"
                className="App-link">
                <div class="module-border-wrap-link" style={{width:'400px'}}>
                    <div class="module" style={{textAlign:'center'}}>
                        <h1 className="App-heading">About</h1>
                    </div>
                </div>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
                href="/xyntechx-challenges"
                rel="noopener noreferrer"
                className="App-link">
                <div class="module-border-wrap-link" style={{width:'400px'}}>
                    <div class="module" style={{textAlign:'center'}}>
                        <h1 className="App-heading">Xyntechx Challenges</h1>
                    </div>
                </div>
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
                href="/projects"
                rel="noopener noreferrer"
                className="App-link">
                <div class="module-border-wrap-link" style={{width:'400px'}}>
                    <div class="module" style={{textAlign:'center'}}>
                        <h1 className="App-heading">Projects</h1>
                    </div>
                </div>
            </a>
            </div>

        <div className="topnav">
        <a href="/" rel="noopener noreferrer">
            <img className="App-logo" src={logo} alt="xyntechx"/>
        </a>
        <a
            href="https://github.com/xyntechx"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img className="App-logo" src={github} alt="GitHub"/>
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a
            href="https://www.instagram.com/xyntechx/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img className="App-logo" src={instagram} alt="Instagram"/>
        </a>
        </div>
        </body>
        </div>
    );
}

function Main() {
    return (
        <div>
            <Router>
                <div>
                    <Route exact path='/' render={() => {
                        return renderMain()
                    }}/>
                    <Route path='/about' component={About}/>
                    <Route path='/xyntechx-challenges' component={Challenges}/>
                    <Route path='/projects' component={Projects}/>
                </div>
            </Router>
        </div>
    );
}

export default Main;