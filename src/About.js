import cpp from './images/cpp.png'
import cs from './images/cs.png'
import css from './images/css.png'
import django from './images/django.png'
import html from './images/html.png'
import java from './images/java.png'
import js from './images/js.png'
import kotlin from './images/kotlin.png'
import python from './images/python.png'
import react from './images/react.png'
import unity from './images/unity.png'
import github from './images/github.png';
import instagram from './images/instagram.png';
import logo from './images/myLogo.png';

function About() {
    return (
    <div className="App">
        <body className="App-body">

            <h1 className="App-heading">ABOUT</h1>
            <p>
            Hello! My name is Nyx!
            <br></br>
            <br></br>
            I'm a teenager passionate about Computer Science and all things STEM! As a programmer, I aim to create fun via the code I write, which is translated into games, web apps, and other interesting projects. In doing so, I hope to teach and inspire those who aspire to pursue STEM in the future.
            </p>

            <p></p>

            <div class="module-border-wrap">
                <div class="module">
                    <h1 className="App-heading">Languages & Tools</h1>
                    <img style={{height: '50px'}} src={python} alt="python"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={cs} alt="C#"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={cpp} alt="C++"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={java} alt="Java"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={kotlin} alt="Kotlin"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={html} alt="HTML"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={css} alt="CSS"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={js} alt="JavaScript"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={unity} alt="Unity"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={django} alt="Django"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img style={{height: '50px'}} src={react} alt="React"/>

                </div>
            </div>

            <p></p>
            <p></p>

            <div class="module-border-wrap">
                <div class="module">
                    <h1 className="App-heading">Interests</h1>
                    <p>I love programming, drawing, and playing sports.</p>
                    <h3>Programming</h3>
                    <p>I've been programming since October 2018 when I was 14 years old. I was intrigued by how games are made and so I wanted to try to develop my own mobile game. Since I had (and still have) an android phone, I googled "How to make an android mobile game", accidentally discovering the world of programming! Ever since then, I can say that programming is a passion of mine.</p>
                    <h3>Drawing</h3>
                    <p>I've got a long history with drawing as it is definitely a hobby which has stuck with me ever since I was very very young. I draw during my free time and even occasionally doodle in class when I'm bored. Inspired by Dragon Ball Z (my favourite TV show), I have drawn many personal comic book series since I was 8, and I definitely won't stop doing so any time soon!</p>
                    <h3>Playing Sports</h3>
                    <p>I. Love. Sports. Sports has been a part of my life ever since I can remember. My favourite sport is basketball but I've grown to love Netball after playing it throughout secondary school! Other sports I love as well are badminton, table tennis, volleyball, swimming, etc.</p>
                    <h3>Conclusion</h3>
                    <p>I'm an amphibian when it comes to my interests as my hobbies contrast each other remarkably XD</p>
                </div>
            </div>

            <p></p>
            <p></p>

            <div class="module-border-wrap">
                <div class="module">
                    <h1 className="App-heading">Achievements</h1>
                    <li>Top in Cohort (Grades 1 - 9) (as of now)</li>
                    <li>IBM Quantum Challenge Fall 2020 Foundational Badge</li>
                    <li>Bronze Medal in the 2020 Singapore Junior Physics Olympiad</li>
                    <li>President of Student Council (2019 - 2020)</li>
                    <li>Gold Award in iCAN 2019</li>
                    <li>10th place (out of 300+ participants) in the 2019 National Public Speaking Competition</li>
                    <li>2019 STEAM Excellence Pinnacle Award (school-based award)</li>
                    <li>14th place (out of 150+ participants) in the 2018 National Environment Quiz</li>
                    <li>Distinction Award in the 2017 ICAS Science by UNSW Global</li>
                    <li>and several others I earned before 2017 :)</li>
                </div>
            </div>

            <p></p>
            <p></p>

            <div class="module-border-wrap">
                <div class="module">
                    <h1 className="App-heading">Goals</h1>
                    <p>As I pursue my passion in programming, I look forward to learning many more concepts and techniques in the ever-growing field of Computer Science. Currently, I am learning Machine Learning and Quantum Computing because I am extremely intrigued by those fields! Furthermore, I hope to create more games and apps because, in all honesty, I thoroughly enjoy programming and designing as both allow me to express myself creatively in this thought-provoking field. Last but not least, I want to dive into competitive programming as I hope to polish up my problem solving and creative thinking skills. All in all, I aim to learn something new every single day!</p>
                </div>
            </div>

            <p></p>
            <p></p>
            <p></p>
            <p></p>



            <div className="App-link-container">
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

export default About;
