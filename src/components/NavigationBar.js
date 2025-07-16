/* this will house the navigation bar component */
/* will adjust to handle different navigation on different pages */

function NavigationBar() {
    return (
        <div className="header-container">
            <h1>Iskander's Caption Contest!</h1>
            <nav>
                <ul>
                    <li id="loginChange"><a href="../pages/login.html">Login</a></li>
                    <li><a href="#post-container">Captions</a></li>
                    <li><a href="../pages/about.html">About Me</a></li>
                    <li><a href="../pages/leaderboard.html">Leaderboard</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigationBar;

