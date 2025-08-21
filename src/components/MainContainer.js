import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import Image from './Image';
import Post from './Post';
import AboutMe from './AboutMe';
import Leaderboard from './Leaderboard';
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
                    <UserFormControl viewChanger={handleOnClick} tokenExists={tokenExists}/>
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

    function tokenExists(value) {
        setTokenExists(value);
    }

    const newView = evaluateView(currentView);

    return (
        <div>
            <NavigationBar onClick={handleOnClick} tokenExists={tokenExists}/>
            {newView}
        </div>
    );
    
}

export default MainContainer;