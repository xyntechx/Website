import home from './images/home.png';
import './App.css';

function Bottomnav() {
    return (
        <div className="bottomnav">
            <a
                href="/about"
                rel="noopener noreferrer"
            >
                About
            </a>
            <a
                href="/blog"
                rel="noopener noreferrer"
            >
                Blog
            </a>
            <a
                href="/"
                rel="noopener noreferrer"
            >
                <img style={{height: "50px"}} src={home} alt="Home"/>
            </a>
            <a
                href="/projects"
                rel="noopener noreferrer"
            >
                Projects
            </a>
            <a
                href="https://quditi-challenges.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Quditi
                <br></br>
                Challenges
            </a>
        </div>
    )
}

export default Bottomnav;
