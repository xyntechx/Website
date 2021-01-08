import Topnav from './Topnav';
import Bottomnav from './Bottomnav';
import {Button} from '@material-ui/core';
import {useState} from 'react';
import './App.css';

function Blog() {
    const [page, setPage] = useState(0);

    function renderSelection() {
        return (
            <div className="App">
                <body className="App-body">
    
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
        
                    <h1 className="App-heading" style={{textAlign:'center'}}>BLOG</h1>
        
                    <p></p>
    
                    <div class="module-border-wrap">
                        <div class="module">
                            <h1 className="App-heading">My Coding Journey</h1>
                            <Button variant="contained" color="primary" onClick={() => setPage(1)}>Read More</Button>
                        </div>
                    </div>

                    <p></p>
                    <p></p>

                    <div class="module-border-wrap">
                        <div class="module">
                            <h1 className="App-heading">Public Speaking & How I Conquered My Fear</h1>
                            <Button variant="contained" color="primary" onClick={() => setPage(2)}>Read More</Button>
                        </div>
                    </div>

                    <p></p>
                    <p></p>

                    <div class="module-border-wrap">
                        <div class="module">
                            <h1 className="App-heading">Me & Art</h1>
                            <Button variant="contained" color="primary" onClick={() => setPage(3)}>Read More</Button>
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

    function render1()  {
        // My Coding Journey
        return (
            <div className="App">
                    <body className="App-body">
        
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
            
                        <h1 className="App-heading" style={{textAlign:'center'}}>My Coding Journey</h1>
            
                        <p></p>
    
                        <div class="module-border-wrap">
                            <div class="module">
                                <p>If you're reading this, it most likely means that you know who I am. It also most likely means that you know I love programming. It also ALSO most likely means that you know I coded up this website you're on by myself.</p>
                                <p>Was I a prodigy born programmer? Who can honestly know? However, what I do know is that I didn't start coding from the second I was born. Here's how it all began...</p>
                                <h3>An Accident</h3>
                                <p>Here's an excerpt from the About page of my website:</p>
                                <p>"I've been programming since October 2018 when I was 14 years old. I was intrigued by how games are made and so I wanted to try to develop my own mobile game. Since I had (and still have) an android phone, I googled "How to make an android mobile game", accidentally discovering the world of programming! Ever since then, I can say that programming is a passion of mine."</p>
                                <p>As far as I can remember, I didn't actively seek to learn programming. I've heard about hackers and robots and AI and other "computery stuff", but I didn't really think I'd be wanting to try those out in the future. One day, out of the blue, I stared out of the car window and thought to myself that I want to make a game. A mobile game. Why? Well, why not?</p>
                                <p>With determination, I searched for websites where I can learn how to code in Java (because I found out that Java was the language to make android apps, even though I should've learnt how to code in C# and how to use Unity if I wanted to make games haha). Anyway, I found Codecademy and, with great energy and excitement, learnt the syntax of Java, my very first programming language, in 6 days.</p>
                                <h3>Discovering Python...</h3>
                                <p>Right after learning Java, I thought I should learn another language before diving into the whole ordeal of making an android game. It was clear that I was starting to get obsessed with coding. Without much thought, I decided to learn Python because several articles I've read while learning Java suggested that newbies should learn Python. I was also motivated to learn another language because I couldn't quite grasp Object Oriented Programming (OOP), thinking that by learning another language, I'd be able to understand that concept more!</p>
                                <p>Another 6 days flew by and Codecademy's course on Python 3 was done and dusted. I felt confident. I felt that I could take on any coding challenge I was presented with. Part of the reason for my confidence was the fact that I'd made my first project: a Scrabble point counter in Python! I was ecstatic. I wanted more. I wanted to code more.</p>
                                <p>Fun fact: I learnt both Java and Python during the End of Year examinations period!</p>
                                <h3>Coding Challenges</h3>
                                <p>My confidence was soon shattered when I attempted my first coding challenge. I realised that I wasn't invincible. I realised that there's so much more to learn. I realised that learning just the syntax of the languages is not enough.</p>
                                <p>I was excited.</p>
                                <p>The prospect of learning more filled (and still fills) me with anticipation and joy! I was ready to discover more, explore more, experience more.</p>
                                <h3>The Drought</h3>
                                <p>Sadly, after the 2018 December holidays, I stopped coding for around 6 months, only starting again on June 2019. School kept me busy, causing me to turn away from coding. During the 2019 June holidays, I started to code again as I was working on a project with some of my schoolmates. After the holidays, I stopped again.</p>
                                <p>I missed coding.</p>
                                <h3>The (Start of) Spring</h3>
                                <p>If you scroll down to the first ever post on my Instagram, you'll realise that I decided to finally make a game. That game is none other than Black Hole. 29 November 2019 marks the birth of my programming-centric Instagram. Prior to that, I started learning C# in order to develop my games using Unity. I was so excited to make my very first game that I learnt C# in just 5 days! I was ready to take on the challenge.</p>
                                <p>I finished Black Hole on February 2020. I was proud of it. Before long, a certain virus came along and well...</p>
                                <h3>The (Real) Spring</h3>
                                <p>During lockdown, I had significantly more free time in my hands. I decided to use that free time to do what I love: coding! I watched MIT lectures, attempted to make a chatbot app, and did more coding challenges. I could feel myself improve in coding! I felt that I truly was able to code my own projects, and so I did! In fact, you can see all the simple Python projects I've made on my Instagram and GitHub.</p>
                                <p>Even after the end of lockdown, I continued to code. I didn't repeat my mistake of brushing aside coding. I wanted to code even during school days. I coded every single day. Afterall, it is my passion.</p>
                                <h3>Closing</h3>
                                <p>I won't ramble on much more. I did so many things from the moment I started coding until now that I can't include all of them here. If you're curious, you can view my journey and most of the things I've left out from this blog post on my Instagram! All in all, I want you to feel inspired to start, or even continue, your own coding journey! Having said that, I will leave you with these words...</p>
                                <p>There's a whole world of programming left for me to explore.</p>
                                <p>There's a whole world of programming left for you to explore.</p>
                                <p>There's a whole world of programming left for EVERYONE to explore.</p>
                                <p>So go and explore it!</p>
                            </div>
                        </div>

                        <p></p>
                        <p></p>
    
                        <Button variant="contained" color="secondary" onClick={() => setPage(0)}>Back</Button>
    
                        <Topnav/>
                        <p></p>
                        <p></p>
                        <Bottomnav/>
        
                    </body>
                </div>
        )
    }

    function render2() {
        // Public Speaking & How I Conquered My Fear
        return (
            <div className="App">
                    <body className="App-body">
        
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
            
                        <h1 className="App-heading" style={{textAlign:'center'}}>Public Speaking & How I Conquered My Fear</h1>
            
                        <p></p>
    
                        <div class="module-border-wrap">
                            <div class="module">
                                <p>If you were to ask me now whether I enjoy public speaking or not, I'd say absolutely. I love everything about it: the adrenaline I get when I'm in front of an audience; the opportunity for me to express myself; the way I can enunciate the words I speak. This passion won me 10th place in the 2019 National Public Speaking Competition, my first ever public speaking competition.</p>
                                <p>However, if you were to ask me around 3 years ago whether I enjoy public speaking or not, I'd say no. I wouldn't run away and cry when tasked to give a speech or present, but I wouldn't volunteer to do so. In fact, I wasn't even selected to represent my school in the preliminaries of the 2017 National Public Speaking Competition after auditioning for it.</p>
                                <p>How did I conquer my fear then? Well, I'm asking that very same question myself. However, I think I'm able to answer it now...</p>
                                <h3>Before</h3>
                                <p>I was a shy kid. I didn't really want to talk to anybody and preferred to keep to myself. My friends agree that I used to be super introverted and that they would never expect THAT me to grow up to THIS me. Of course, they're very happy that I am who I am today!</p>
                                <p>I can't really pinpoint why I was so introverted. I know that when I was very very young, just like many other people, I was super "out-there", randomly dancing on stage or whatever. I guess I just grew more self-conscious.</p>
                                <h3>President of Student Council</h3>
                                <p>I think what really helped me break out of my shell is becoming the President of my school's Student Council. I've been part of the council since 2017 (Grade 7) but only those in Grade 9 are eligible to become part of the council's Executive Committee. So when I was in Grade 9, I was selected to be part of the Executive Committee as the President (thank you, teachers!).</p>
                                <p>I think becoming President helped make me more confident and self-assured, but I think what really pushed me to becoming somebody who loves public speaking is my first speech as President. Every year, when a new President is elected, said new President has to address the school. By that time, I was not as reserved as I was before, but I still was nervous. Despite that, I was looking forward to delivering the speech I had prepared.</p>
                                <p>I think the transition I underwent from being shy to being confident was a gradual one, as all transitions are. Having said that, I do think that delivering my first major speech was a catalyst for my love for public speaking.</p>
                                <p>The time came to address the school. At that moment, all I thought about was me delivering the speech. I didn't feel nervous.</p>
                                <p>I think I felt happy.</p>
                                <h3>Other Speeches</h3>
                                <p>After that, I felt a real change in me. I felt that I enjoyed, not just okay with, public speaking.</p>
                                <p>During the 2019 June holidays, I had to deliver a speech to the public as part of a project I did with some of my schoolmates. Fast forward a few months later I auditioned again for the National Public Speaking Competition, this time 2019 edition. I got selected, passed the preliminaries, and won 10th place in the finals!</p>
                                <p>Through all the speeches I've delivered, I've become more and more confident.</p>
                                <h3>Closing</h3>
                                <p>So, how DID I conquer my fear? I think it was all thanks to the courage of stepping out of my comfort zone.</p>
                                <p>I think you should step out of your comfort zone too!</p>
                            </div>
                        </div>

                        <p></p>
                        <p></p>
    
                        <Button variant="contained" color="secondary" onClick={() => setPage(0)}>Back</Button>
    
                        <Topnav/>
                        <p></p>
                        <p></p>
                        <Bottomnav/>
        
                    </body>
                </div>
        )
    }

    function render3() {
        // Me & Art
        return (
            <div className="App">
                    <body className="App-body">
        
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
            
                        <h1 className="App-heading" style={{textAlign:'center'}}>Me & Art</h1>
            
                        <p></p>
    
                        <div class="module-border-wrap">
                            <div class="module">
                                <p>If I hadn't learnt programming, I think drawing would be my #1 hobby. I love creating my own characters and have them be integrated in a story where they can interact and develop. Without a doubt, drawing has helped me develop my creativity, and I wouldn't be me without it.</p>
                                <h3>Dragon Ball Z Kai (DBZ Kai)</h3>
                                <p>I think I was 8 when I came across DBZ Kai on TV. Usually, I would wait until 9pm to watch Adventure Time, but that day I decided to watch TV earlier. Coincidentally, DBZ Kai was on TV from 8pm to 9pm. Before long, I became a big DBZ Kai and, by proxy, DBZ fan.</p>
                                <p>I was obsessed with Super Saiyans and hence I began drawing original characters with transformations as well.</p>
                                <p>Side note: my favourite character is Vegeta.</p>
                                <h3>Comic Book Series</h3>
                                <p>As of writing this, I've drawn hundreds (if not thousands) of pages of personal comic books and am working on a brand new series inspired by Naruto and, of course, DBZ. I've never felt comfortable enough to showcase my work to anyone except my sister, but I'm working on that hahaha!</p>
                                <p>Other than the "real" comics I'm drawing, I also love to just doodle on used paper whenever I get the chance. Sometimes, I even do it in class when I get bored!</p>
                                <h3>Closing</h3>
                                <p>This post is a short one, but I want it to be on my website nonetheless.</p>
                                <p>I want you to know that it's okay to pursue other interests outside of your main hobby. It keeps life interesting and it keeps you happy and motivated!</p>
                                <p>Pick up a hobby and enjoy it!</p>
                            </div>
                        </div>

                        <p></p>
                        <p></p>
    
                        <Button variant="contained" color="secondary" onClick={() => setPage(0)}>Back</Button>
    
                        <Topnav/>
                        <p></p>
                        <p></p>
                        <Bottomnav/>
        
                    </body>
                </div>
        )
    }


    if (page === 0) {
        return renderSelection()
    } else if (page === 1) {
        return render1()
    } else if (page === 2) {
        return render2()
    } else if (page === 3) {
        return render3()
    }
}

export default Blog;