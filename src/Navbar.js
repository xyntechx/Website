import './App.css';

function Navbar() {
    return (
        <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                    <a href="#introduction"><li>Introduction</li></a>
                    <a href="#languages-and-tools"><li>Languages & Tools</li></a>
                    <a href="#interests"><li>Interests</li></a>
                    <a href="#achievements"><li>Achievements</li></a>
                    <a href="#goals"><li>Goals</li></a>
                </ul>
        </div>
        </nav>
    )
}

export default Navbar;