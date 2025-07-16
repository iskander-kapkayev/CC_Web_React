import '../styles/App.css';
import React from 'react';
import NavigationBar from './NavigationBar.jsx';
import Image from './Image.js';
import Post from './Post.js';
import CaptionForm from './CaptionForm.js';

function App() {
  return (
    <div>
      <h1>From App</h1>
      <NavigationBar></NavigationBar>
    </div>
  );
}

export default App;
