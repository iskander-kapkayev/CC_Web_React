import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar.js';
import Image from './Image.js';
import AboutMe from './AboutMe.js';
import Leaderboard from './Leaderboard.js';
import UserFormControl from './UserFormControl.js';


/* the main container will display whatever the currentView is */
function MainContainer() {
    const [currentView, setCurrentView] = useState('home'); // initially set to home view
    const [tokenExists, setTokenExists] = useState(false); // generally no token

    function evaluateView(newView) {
        if (newView === 'home') {
            return (
                <div>
                    <Image tokenExists={tokenExists} handleTokenExists={handleTokenExists} />
                </div>
            );
        } else if (newView === 'login') {
            return (
                <div>
                    <UserFormControl viewChanger={handleOnClick} handleTokenExists={handleTokenExists}/>
                </div>
            );
        } else if (newView === 'about') {
            return (
                <div>
                    <AboutMe />
                </div>
            );
        } else if (newView === 'leader') {
            return (
                <div>
                    <Leaderboard />
                </div>
            );
        }
    }

    function handleOnClick(newView) {
        setCurrentView(newView);
    }

    function handleTokenExists(exists) {
        setTokenExists(exists);
        if (!exists) {
            /* destroy session storages if they exist */
            sessionStorage.removeItem('usertoken');
            sessionStorage.removeItem('username');
        }
    }

    // we will run this to check if a token exists when page is refreshed

    useEffect ( () => {
        const thistoken = sessionStorage.getItem('usertoken');
        if (thistoken) {
            handleTokenExists(true);
        }
    }, []);

    const newView = evaluateView(currentView);

    return (
        <div>
            <NavigationBar onClick={handleOnClick} tokenExists={tokenExists} handleTokenExists={handleTokenExists}/>
            {newView}
        </div>
    );
    
}

export default MainContainer;