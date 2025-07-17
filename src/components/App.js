import '../styles/App.css';
import React, { useState } from 'react';
import NavigationBar from './NavigationBar.js';
import Image from './Image.js';
import Post from './Post.js';
import CaptionForm from './CaptionForm.js';
import AboutMe from './AboutMe.js';
import Leaderboard from './Leaderboard.js';

function App() {
  const [currentView, setCurrentView] = useState('home');

  function handleNavigationClick(newView) {
    setCurrentView(newView);
  }

  if (currentView === 'home') {
    return (
      <div>
        <h1>From App</h1>
        <NavigationBar onClick={handleNavigationClick}/>
        <Image />
        <Post />
      </div>
    );
  } else if (currentView === 'about') {
    return (
      <div>
        <h1>From App</h1>
        <NavigationBar onClick={handleNavigationClick}/>
        <AboutMe />
      </div>
    );
  } else if (currentView === 'leader') {
    return (
      <div>
        <h1>From App</h1>
        <NavigationBar onClick={handleNavigationClick}/>
        <Leaderboard />
      </div>
    );
  }

}

export default App;
