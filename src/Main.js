import me from './images/me.png';
import my_website from './images/my website.png';
import python_projects from './images/python projects.png';
import milky_way from './images/milky way.png';
import Navbar from './Navbar';
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import React, {useEffect} from 'react';

function Main() {
    useEffect(() => {
        AOS.init({
            duration: 400,
            delay: 200,
            easing: 'linear',
        });
    }, []);

    return (
        <div className="App">
            <body className="App-body">

                <div className="box-container" style={{paddingTop:'150px'}}>
                    <div className="box">
                        <h1 className="App-heading" style={{textAlign:'center', letterSpacing:'10px'}}>Nyx Iskandar</h1>
                        <p>Hello there! Welcome to my website 🤩!</p>
                        <p></p>
                        <img style={{height: "300px"}} src={me} alt="Me"/>
                        <p></p>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', columnGap:'20px'}}>
                            <a className="button bouncy" style={{backgroundColor:'#067EED', borderColor:'#000000'}} href="https://www.linkedin.com/in/nyx-iskandar-ba456a205/"
                                target="_blank"
                                rel="noopener noreferrer">
                                Learn More
                            </a>
                            <p></p>
                            <a className="button bouncy" style={{backgroundColor:'#FF7C1F', borderColor:'#000000'}} href="mailto:xyntechx@gmail.com">
                                Let's Connect
                            </a>
                        </div>
                    </div>
                </div>

                <div className="box-container" style={{backgroundColor:'#000000', color:'#FFFFFF', letterSpacing:'10px'}}>
                    <div className="box" data-aos="flip-up">
                        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <h1 className="App-heading">WHO I AM</h1>
                            <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', letterSpacing:'0px'}}>
                                <p>Hi! I am Nyx, a driven, ambitious, and inquisitive teenager passionate about <span style={{color:'#FF7C1F'}}>computer science</span>, <span style={{color:'#067EED'}}>entrepreneurship</span>, and <span style={{color:'#FF7C1F'}}>service-learning</span>. I love to experiment with and try out new things, striving to improve myself every day. I do not shy away from responsibilities nor opportunities as I crave challenges and chase goals ardently every step of the way. I believe that with the right mindset and the right people around, anyone can do anything in any way.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="box-container" style={{letterSpacing:'10px'}}>
                    <div className="box" data-aos="flip-up">
                        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <div style={{width:'50%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', letterSpacing:'0px'}}>
                                <p style={{color:'#FF7C1F'}}>Computer Science.</p>
                                <p style={{color:'#067EED'}}>Entrepreneurship.</p>
                                <p style={{color:'#FF7C1F'}}>Service-Learning.</p>
                            </div>
                            <h1 className="App-heading" style={{textAlign:'right'}}>WHAT I LOVE</h1>
                        </div>
                    </div>
                </div>

                <div className="box-container" style={{backgroundColor:'#000000', color:'#FFFFFF', letterSpacing:'10px', paddingBottom:'0px'}}>
                    <div className="box" data-aos="flip-up">
                        <div style={{width:'100%', textAlign:'center'}}>
                            <h1 className="App-heading">PROJECT HIGHLIGHTS</h1>
                        </div>
                    </div>
                </div>
                <div className="box-container" style={{backgroundColor:'#000000', color:'#FFFFFF', paddingTop:'0px', paddingBottom:'0px'}}>
                    <div className="box" data-aos="flip-up">
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'20px'}}>
                            <div className='section'>
                                <p>My Website</p>
                                <a
                                href="https://github.com/xyntechx/Website"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    <img className="img-link" src={my_website} alt="My Website"/>
                                </a>
                            </div>
                            <div className='section'>
                                <p>Milky Way</p>
                                <a
                                href="https://github.com/xyntechx/MilkyWay"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    <img className="img-link" src={milky_way} alt="Milky Way Gameplay"/>
                                </a>
                            </div>
                            <div className='section'>
                                <p>Python Projects</p>
                                <a
                                href="https://github.com/xyntechx/Python-Projects"
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    <img className="img-link" src={python_projects} alt="Python Projects"/>
                                </a>
                            </div>
                        </div>
                        <div className="box-container" style={{backgroundColor:'#000000', color:'#FFFFFF', paddingTop:'100px'}}>
                            <div className="box" data-aos="flip-up">
                                <a className="button bouncy" style={{backgroundColor:'#067EED', borderColor:'#FFFFFF'}} href="https://github.com/xyntechx"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    More Projects
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <Navbar/>
    
            </body>
        </div>
    );
}

export default Main;
