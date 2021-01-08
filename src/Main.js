import me from './images/me.png';
import About from './About';
import Challenges from './Challenges';
import Projects from './Projects';
import Blog from './Blog'
import Topnav from './Topnav';
import Bottomnav from './Bottomnav';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

function renderMain() {
    return (
    <div className="App">
        <body className="App-body">

            <p></p>
            <p></p>
            <p></p>
            <p></p>

            <p>Hello! I am</p>
            <h1 className="App-heading" style={{textAlign:'center'}}>Nyx Iskandar</h1>

            <p></p>

            <img className="me" src={me} alt="Me"/>

            <p></p>

            <div class="module-border-wrap">
                <div class="module" style={{textAlign:'center'}}>
                    <p>Student | Programmer | Game Developer | Web Developer | Startup Founding Member</p>
                </div>
            </div>

            <Topnav/>
            <p></p>
            <p></p>
            <Bottomnav/>

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
                    <Route path='/blog' component={Blog}/>
                </div>
            </Router>
        </div>
    );
}

export default Main;
