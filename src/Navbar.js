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
                    <li></li>
                    <a href="#languages-and-tools"><li>Languages & Tools</li></a>
                    <li></li>
                    <a href="#interests"><li>Interests</li></a>
                    <li></li>
                    <a href="#achievements"><li>Achievements</li></a>
                    <li></li>
                    <a href="#goals"><li>Goals</li></a>
                    <li></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
