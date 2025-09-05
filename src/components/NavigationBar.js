/* this will house the navigation bar component */
/* will adjust to handle different navigation on different pages */
import React , { useState } from 'react';

function NavigationBar(props) {

    // if token exists, then remove the user login portion of the navigation bar to a sign out option

    // function to delete usertoken and sign out user, redirect to home page
    function signoutUser(called) {

        // signout can be called by regular user interaction or an expired token check
        sessionStorage.removeItem('usertoken'); // remove token
        sessionStorage.removeItem('username'); // remove token timer

        props.handleTokenExists(false); // token removed, so doesn't exist
        props.onClick('home'); // set to home page after login!
    }

    const usernameExists = sessionStorage.getItem('username');

    return (
        <div className="header-container">
            {usernameExists ?
                <h1>Iskander's Caption Contest! - Welcome back {usernameExists}</h1> :
                <h1>Iskander's Caption Contest!</h1>
            }
            <nav>
                <ul>
                    {props.tokenExists ? 
                        <li onClick={() => signoutUser('regular')}>Sign Out</li> : 
                        <li onClick={() => props.onClick('login')}>Login</li>
                    }
                    <li onClick={() => props.onClick('home')}>Captions</li>
                    <li onClick={() => props.onClick('about')}>About Me</li>
                    <li onClick={() => props.onClick('leader')}>Leaderboard</li>
                </ul>
            </nav>
        </div>
    );
}

export default NavigationBar;

