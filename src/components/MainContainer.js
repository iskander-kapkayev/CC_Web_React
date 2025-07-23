import React, { useState } from 'react';
import NavigationBar from './NavigationBar';

function evaluateView(newView) {
    if (newView === 'home') {
        return (
            <div>
                <NavigationBar onClick={handleOnClick}/>
                <Login />
            </div>
        );
    } else if (newView === 'login') {
        return (
            <div>
                <NavigationBar onClick={handleOnClick}/>
                <AboutMe />
            </div>
        );
    } else if (newView === 'about') {
        return (
            <div>
                <NavigationBar onClick={handleOnClick}/>
                <AboutMe />
            </div>
        );
    } else if (newView === 'leader') {
        return (
            <div>
                <NavigationBar onClick={handleOnClick}/>
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

    return newView;
    
}

export default MainContainer;