import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

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
                <LoginForm />
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


/* the main container will display whatever the currentView is */
function MainContainer() {
    const [currentView, setCurrentView] = useState('home'); // initially set to home view

    function handleOnClick(newView) {
        setCurrentView(newView);
    }

    const newView = evaluateView(currentView);

    return (
        <div>
            <NavigationBar onClick={handleOnClick}/>
            {newView}
        </div>
    );
    
}

export default MainContainer;