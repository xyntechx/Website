import Topnav from './Topnav';
import Bottomnav from './Bottomnav';

function Challenges() {
    return (
        <div className="App">
            <body className="App-body">

                <p></p>
                <p></p>
                <p></p>
                <p></p>
    
                <h1 className="App-heading" style={{textAlign:'center'}}>XYNTECHX CHALLENGES</h1>
    
                <p></p>

                <div className="App-link-container">
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
                </div>


            <Topnav/>
            <p></p>
            <p></p>
            <Bottomnav/>

        </body>
        </div>
    );
}

export default Challenges;
