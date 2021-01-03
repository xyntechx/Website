import github from './images/github.png';
import instagram from './images/instagram.png';
import logo from './images/myLogo.png';

function Projects() {
    return (
        <div className="App">
            <body className="App-body">
    
                <h1 className="App-heading" style={{textAlign:'center'}}>PROJECTS</h1>
    
                <p></p>

                <h1 className="App-heading" style={{textAlign:'center'}}>Ongoing</h1>

                <p></p>

                <a
                    href="https://www.instagram.com/xyntechx/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Learn Python</h1>
                            <p>Learn Python is a series of posts on my Instagram which aims to teach the basics of Python all the way to its advanced concepts.</p>
                        </div>
                    </div>
                </a>

                <p></p>
                <p></p>

                <h1 className="App-heading" style={{textAlign:'center'}}>Past</h1>

                <p></p>
    
                <a
                    href="https://github.com/xyntechx/MilkyWay-Game"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Milky Way</h1>
                            <p>Milky Way is a game in which you, the player, are a pilot of a spaceship traversing our galaxy called Milky Way (hence the name)! Along the journey, you encounter another spaceship identical to yours in every way except for the colour. You find out that that spaceship is operated by an alien who wishes to destroy your spaceship and you along with it.
                            <br></br>
                            <br></br>
                            Survive by defeating the enemy and continue your adventure in Milky Way!</p>
                        </div>
                    </div>
                </a>
    
                <p></p>
                <p></p>
    
                <a
                    href="https://github.com/xyntechx/BlackHole-Game"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Black Hole</h1>
                            <p>Black Hole is made with Unity using C# and is my first attempt at creating a real game from scratch.</p>
                        </div>
                    </div>
                </a>
    
                <p></p>
                <p></p>
    
                <a
                    href="https://github.com/xyntechx/Python-Projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link">
                        <div class="module">
                            <h1 className="App-heading">Python Projects</h1>
                            <p>This is a collection of simple Python projects by me.</p>
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
                    href="/"
                    rel="noopener noreferrer"
                    className="App-link">
                    <div class="module-border-wrap-link" style={{width:'400px'}}>
                        <div class="module" style={{textAlign:'center'}}>
                            <h1 className="App-heading">Home</h1>
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

export default Projects;
