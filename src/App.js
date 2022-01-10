import React from 'react'
import Player from './Player'
import './App.css';
import {AuthProvider} from './contexts/AuthContext'

function App() {
  
  return (
    <AuthProvider>
      <div className="App">
        <Player />
      </div>
      </AuthProvider>
  );
}

export default App;
