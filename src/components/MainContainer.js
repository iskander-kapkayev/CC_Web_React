import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import Image from './Image';
import Post from './Post';
import AboutMe from './AboutMe';
import NewLeaderboard from './NewLeaderboard';
import UserFormControl from './UserFormControl';


/* the main container will display whatever the currentView is */
function MainContainer() {
    const [currentView, setCurrentView] = useState('home'); // initially set to home view
    const [tokenExists, setTokenExists] = useState(false); // generally no token

    function evaluateView(newView) {
        if (newView === 'home') {
            return (
                <div>
                    <Image />
                    <Post />
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
                    <NewLeaderboard />
                </div>
            );
        }
    }

    function handleOnClick(newView) {
        setCurrentView(newView);
    }

    function handleTokenExists(exists) {
        setTokenExists(exists);
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