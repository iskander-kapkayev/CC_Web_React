/* this will house the navigation bar component */
/* will adjust to handle different navigation on different pages */
import React , { useState } from 'react';

function NavigationBar(props) {

    // if token exists, then remove the user login portion of the navigation bar

    if (props.tokenExists) {
        return (
            <div className="header-container">
                <h1>Iskander's Caption Contest!</h1>
                <nav>
                    <ul>
                        <li onClick={() => props.onClick('home')}>Captions</li>
                        <li onClick={() => props.onClick('about')}>About Me</li>
                        <li onClick={() => props.onClick('leaderboard')}>Leaderboard</li>
                    </ul>
                </nav>
            </div>
        );
    } else {
        return (
            <div className="header-container">
                <h1>Iskander's Caption Contest!</h1>
                <nav>
                    <ul>
                        <li onClick={() => props.onClick('login')}>Login</li>
                        <li onClick={() => props.onClick('home')}>Captions</li>
                        <li onClick={() => props.onClick('about')}>About Me</li>
                        <li onClick={() => props.onClick('leaderboard')}>Leaderboard</li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;

