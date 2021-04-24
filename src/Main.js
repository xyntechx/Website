import me from './images/me.png';
import website from './images/website.png';
import console from './images/console.png';
import code from './images/code.png';
import bronze from './images/bronze.png';
import gold from './images/gold.png';
import document from './images/document.png';
import netball from './images/netball.png';
import leadership from './images/leadership.png';
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

                <div className="box-container">
                    <div className="box">
                        <h1 className="App-heading" style={{textAlign:'center', letterSpacing:'10px'}}>Nyx Iskandar</h1>
                        <p>Hello there! Welcome to my website 🤩!</p>
                        <p></p>
                        <img style={{height: "300px"}} src={me} alt="Me"/>
                        <p></p>

                        <a className="button4 bouncy" style={{backgroundColor:'#067EED'}} href="https://www.linkedin.com/in/nyx-iskandar-ba456a205/"
                            target="_blank"
                            rel="noopener noreferrer">
                            Find Out More
                        </a>
                        <p></p>
                        <a className="button4 bouncy" style={{backgroundColor:'#FF7C1F'}} href="mailto:xyntechx@gmail.com">
                            Let's Connect
                        </a>

                    </div>
                </div>

                <p></p>
                <p></p>
                

                <div className="box-container">
                    <div className="box" data-aos="flip-up">
                        <div style={{width:'100%', textAlign:'center'}}>
                            <h1 className="App-heading">Project Highlights</h1>
                        </div>
                    </div>
                </div>
                <div className="box-container">
                    <div className="box" data-aos="flip-up">
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'20px'}}>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>My Website</h3>
                                <img style={{width:'75%', height:'auto'}} src={website} alt="website"/>
                            </div>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>Milky Way</h3>
                                <img style={{width:'75%', height:'auto'}} src={console} alt="console"/>
                            </div>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>Python Projects</h3>
                                <img style={{width:'75%', height:'auto'}} src={code} alt="code"/>
                            </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <a className="button4 bouncy" style={{backgroundColor:'#067EED'}} href="https://github.com/xyntechx"
                    target="_blank"
                    rel="noopener noreferrer">
                        More Projects on GitHub
                </a>

                <p></p>
                <p></p>

                <div className="box-container">
                    <div className="box" data-aos="flip-up">
                        <div style={{width:'100%', textAlign:'center'}}>
                            <h1 className="App-heading">Recent Achievements</h1>
                        </div>
                    </div>
                </div>
                <div className="box-container">
                    <div className="box" data-aos="flip-up">
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'20px'}}>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>IBM Quantum Challenge Fall 2020: Foundational Badge</h3>
                                <img style={{width:'75%', height:'auto'}} src={bronze} alt="IBM Q Challenge - Bronze"/>
                            </div>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>iCAN 2019: Gold</h3>
                                <img style={{width:'75%', height:'auto'}} src={gold} alt="iCAN - Gold"/>
                            </div>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>2019 National Public Speaking Competition: Grand Finalist, 10th</h3>
                                <img style={{width:'75%', height:'auto'}} src={gold} alt="NPSC - Gold"/>
                            </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <a className="button4 bouncy" style={{backgroundColor:'#FF7C1F'}} href="https://www.linkedin.com/in/nyx-iskandar-ba456a205/"
                    target="_blank"
                    rel="noopener noreferrer">
                        Learn More
                </a>

                <p></p>
                <p></p>

                <div className="box-container">
                    <div className="box" data-aos="flip-up">
                        <div style={{width:'100%', textAlign:'center'}}>
                            <h1 className="App-heading">Experience</h1>
                        </div>
                    </div>
                </div>
                <div className="box-container">
                    <div className="box" data-aos="flip-up">
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', columnGap:'20px'}}>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>2021 Nanyang Research Programme: Document Layout Analysis Using Machine Learning</h3>
                                <img style={{width:'75%', height:'auto'}} src={document} alt="NRP"/>
                            </div>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>2019-2020 President of Students' Council</h3>
                                <img style={{width:'75%', height:'auto'}} src={leadership} alt="President of Students' Council"/>
                            </div>
                            <div style={{width:'100%', textAlign:'center'}}>
                                <h3>2017-2018 Netball Captain</h3>
                                <img style={{width:'75%', height:'auto'}} src={netball} alt="Netball"/>
                            </div>
                        </div>
                    </div>
                </div>
                <p></p>
                <a className="button4 bouncy" style={{backgroundColor:'#067EED'}} href="https://www.linkedin.com/in/nyx-iskandar-ba456a205/"
                    target="_blank"
                    rel="noopener noreferrer">
                        View More
                </a>

                <p></p>
                <p></p>

                <Navbar/>
    
            </body>
        </div>
    );
}

export default Main;
