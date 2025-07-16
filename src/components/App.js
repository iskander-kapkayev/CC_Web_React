import '../styles/App.css';
import React from 'react';
import NavigationBar from './NavigationBar.js';
import Image from './Image.js';
import Post from './Post.js';
import CaptionForm from './CaptionForm.js';

function App() {
  return (
    <div>
      <h1>From App</h1>
      <NavigationBar></NavigationBar>
      <Image></Image>
    </div>
  );
}

export default App;
