import github from './images/github.png';
import instagram from './images/instagram.png';
import logo from './images/myLogo.png';

function Challenges() {
    return (
        <div className="App">
            <body className="App-body">
    
                <h1 className="App-heading" style={{textAlign:'center'}}>XYNTECHX CHALLENGES</h1>
    
                <p></p>

                <a
                    href="https://github.com/xyntechx/Xyntechx-Challenges/blob/main/Challenge-5.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Challenge #5</h1>
                            <p>Colour Count</p>
                        </div>
                    </div>
                </a>
    
                <p></p>
                <p></p>
    
                <a
                    href="https://github.com/xyntechx/Xyntechx-Challenges/blob/main/Challenge-4.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Challenge #4</h1>
                            <p>Diff in Elem</p>
                        </div>
                    </div>
                </a>
    
                <p></p>
                <p></p>
    
                <a
                    href="https://github.com/xyntechx/Xyntechx-Challenges/blob/main/Challenge-3.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Challenge #3</h1>
                            <p>Island Hopping</p>
                        </div>
                    </div>
                </a>
    
                <p></p>
                <p></p>
    
                <a
                    href="https://github.com/xyntechx/Xyntechx-Challenges/blob/main/Challenge-2.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Challenge #2</h1>
                            <p>Cool String</p>
                        </div>
                    </div>
                </a>
    
                <p></p>
                <p></p>

                <a
                    href="https://github.com/xyntechx/Xyntechx-Challenges/blob/main/Challenge-1.py"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Challenge #1</h1>
                            <p>Longest Word</p>
                        </div>
                    </div>
                </a>

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
                href="/"
                rel="noopener noreferrer"
                className="App-link">
                <div class="module-border-wrap-link" style={{width:'400px'}}>
                    <div class="module" style={{textAlign:'center'}}>
                        <h1 className="App-heading">Home</h1>
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
    
    
    
            <div class="topnav">
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

export default Challenges;
