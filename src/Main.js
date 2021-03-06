import me from './images/me.png';
import github from './images/github.png';
import instagram from './images/instagram.png';
import fiverr from './images/fiverr.png';
import linkedin from './images/linkedin.png';
import email from './images/email.png';
import cpp from './images/cpp.png';
import cs from './images/cs.png';
import css from './images/css.png';
import django from './images/django.png';
import html from './images/html.png';
import java from './images/java.png';
import js from './images/js.png';
import kotlin from './images/kotlin.png';
import python from './images/python.png';
import react from './images/react.png';
import unity from './images/unity.png';
import Navbar from './Navbar';
import xyntechx from './images/xyntechx.png'
import './App.css';

function Main() {
    return (
        <div className="App">
            <body className="App-body">
    
                <div id="introduction"/>
    
                <p></p>
                <p></p>
    
                <img style={{height: "300px"}} src={me} alt="Me"/>
    
                <h1 className="App-heading" style={{textAlign:'center', letterSpacing:'5px'}}>Nyx Iskandar</h1>

                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <p style={{color:'#ff7c1f'}}>Student</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p>|</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:'#067eed'}}>Programmer</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p>|</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:'#ff7c1f'}}>Athlete</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p>|</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:'#067eed'}}>Artist</p>
                </div>

                <p></p>
    
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
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
                        href="https://www.linkedin.com/in/nyx-iskandar-ba456a205/"
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
    
                    <p>
                    Hello! My name is Nyx!
                    <br></br>
                    <br></br>
                    I'm a teenager passionate about Computer Science and all things STEM! As a programmer, I aim to create fun via the code I write, which is translated into games, web apps, and other interesting projects. In doing so, I hope to teach and inspire those who aspire to pursue STEM in the future.
                    </p>

                <div id="languages-and-tools"/>
    
                <div style={{width:'100%', textAlign:'left'}}>
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
    
                <div id="interests"/>
    
                <div style={{width:'100%', textAlign:'left'}}>
                        <h1 className="App-heading">Interests</h1>
                        <p>I love programming, drawing, and playing sports.</p>
                        <h3>Programming</h3>
                        <p>I've been programming since October 2018 when I was 14 years old. I was intrigued by how games are made and so I wanted to try to develop my own mobile game. Since I had (and still have) an android phone, I googled "How to make an android mobile game", accidentally discovering the world of programming! Ever since then, I can say that programming is a passion of mine.</p>
                        <h3>Drawing</h3>
                        <p>I've got a long history with drawing as it is definitely a hobby which has stuck with me ever since I was very very young. I draw during my free time and even occasionally doodle in class when I'm bored. Inspired by Dragon Ball Z (my favourite TV show), I have drawn many personal comic book series since I was 8, and I definitely won't stop doing so any time soon!</p>
                        <h3>Playing Sports</h3>
                        <p>I. Love. Sports. Sports has been a part of my life ever since I can remember. My favourite sports are basketball, volleyball, and netball! Now, I am playing for Raffles Volleyball (my school's volleyball team). Other sports I love as well are badminton, table tennis, swimming, etc.</p>
                        <h3>Conclusion</h3>
                        <p>I'm an amphibian when it comes to my interests as my hobbies contrast each other remarkably XD</p>
                </div>
    
                <div id="achievements"/>
    
                <div style={{width:'100%', textAlign:'left'}}>
                        <h1 className="App-heading">Achievements</h1>
                        <li>Top in Cohort (Grades 1 - 10) (as of now)</li>
                        <li>IBM Quantum Challenge Fall 2020 Foundational Badge</li>
                        <li>Bronze Medal in the 2020 Singapore Junior Physics Olympiad</li>
                        <li>President of Student Council (2019 - 2020)</li>
                        <li>Gold Award in iCAN 2019</li>
                        <li>10th place (out of 300+ participants) in the 2019 National Public Speaking Competition</li>
                        <li>2019 STEAM Excellence Pinnacle Award (school-based award)</li>
                        <li>14th place (out of 150+ participants) in the 2018 National Environment Quiz</li>
                        <li>Distinction Award in the 2017 ICAS Science by UNSW Global</li>
                        <li>and several others I earned before 2017!</li>
                </div>
    
                <div id="goals"/>
    
                <div style={{width:'100%', textAlign:'left'}}>
                        <h1 className="App-heading">Goals</h1>
                        <p>As I pursue my passion in programming, I look forward to learning many more concepts and techniques in the ever-growing field of Computer Science. Currently, I am learning Quantum Computing because I am extremely intrigued by that field! Furthermore, I hope to create more games and apps because, in all honesty, I thoroughly enjoy programming and designing as both allow me to express myself creatively in this thought-provoking field. Last but not least, I want to dive into competitive programming as I hope to polish up my problem solving and creative thinking skills. All in all, I aim to learn something new every single day!</p>
                </div>

                <p></p>
                <p></p>

                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img style={{height: "200px"}} src={xyntechx} alt="My logo"/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                        <h1 className="App-heading">Stay Hungry</h1>
                        <h1 className="App-heading">Stay Foolish</h1>
                    </div>

                </div>
    
                <Navbar/>

                <p></p>
                <p></p>
    
            </body>
        </div>
    );
}

export default Main;
