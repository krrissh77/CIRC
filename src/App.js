import React from 'react';
import Chat from './chat'; // Import the Chat component
import './App.css';

function App() {
  return (
    <div className="container">
      <div className='leftSec'>
        <img className='AvatarImg' src='https://images.unsplash.com/photo-1589254066213-a0c9dc853511?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mnw0ckJoTjFTMENsY3x8ZW58MHx8fHx8'/>
        <h1>CIRC</h1>
        <button className='GitBttn'>Github Repo</button>
        <button className='ImgBttn'>Uplode Image</button>
        <h4 className='teamName'>BlackSheep</h4>
      </div>
      <div className='rightSec'>
      <Chat />
      </div>
    </div>
  );
}

export default App;
