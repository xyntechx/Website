import Topnav from './Topnav';
import Bottomnav from './Bottomnav';

function Projects() {
    return (
        <div className="App">
            <body className="App-body">

                <p></p>
                <p></p>
                <p></p>
                <p></p>
    
                <h1 className="App-heading" style={{textAlign:'center'}}>PROJECTS</h1>
    
                <p></p>

                <h1 className="App-heading" style={{textAlign:'center'}}>Ongoing</h1>

                <p></p>

                <div className="App-link-container">
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
        
                    <a
                        href="https://github.com/xyntechx/Quditi-Challenges"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="App-link">
                        <div class="module-border-wrap-link">
                            <div class="module">
                                <h1 className="App-heading">Quditi Challenges</h1>
                                <p>This project is a React web application for Quditi, a startup of which I am a founding member! This web app hosts coding challenges for you to attempt and complete. Upon successful completion of each challenge or 'chapter', which is the equivalent terminology used in this web app, you will receive a Completion Email as a reward for your hard work!</p>
                            </div>
                        </div>
                    </a>
                </div>

                <p></p>
                <p></p>

                <h1 className="App-heading" style={{textAlign:'center'}}>Past</h1>

                <p></p>

                <h2 className="App-heading" style={{textAlign:'center'}}>2021</h2>

                <p></p>

                <div className="App-link-container">
                    <a
                        href="https://github.com/xyntechx/Website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="App-link">
                        <div class="module-border-wrap-link">
                            <div class="module">
                                <h1 className="App-heading">My Website</h1>
                                <p>My website (the one you are at right now) is made using React. I made it because I wanted to experiment with React and frontend development as well as have a site where I can share my journey and projects!</p>
                            </div>
                        </div>
                    </a>
    
                    <p></p>
                    <p></p>
    
                    <a
                        href="https://www.instagram.com/xyntechx/"
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
                </div>
                
                <p></p>
                <p></p>

                <h2 className="App-heading" style={{textAlign:'center'}}>2020</h2>

                <p></p>

                <div className="App-link-container">
                    <a
                        href="https://github.com/xyntechx/MilkyWay"
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
                </div>

                <div style={{width:'60%'}} class="module-border-wrap">
                    <div class="module">
                        <h1 className="App-heading">Be a Whiz</h1>
                        <p>This project is a web application made using Django and React. It is similar to Kahoot in which users can create quizzes for others to do. I'm looking into improving and deploying it soon.</p>
                    </div>
                </div>

                <p></p>
                <p></p>

                <h2 className="App-heading" style={{textAlign:'center'}}>2019</h2>

                <p></p>

                <div className="App-link-container">
                    <a
                        href="https://github.com/xyntechx/BlackHole"
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
                </div>

            <Topnav/>
            <p></p>
            <p></p>
            <Bottomnav/>

        </body>
    </div>
    );
}

export default Projects;
