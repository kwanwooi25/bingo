import React from 'react'
import './App.scss'
import Header from './containers/Header'
import Boards from './containers/Boards'

function App() {
  return (
    <div className="app">
      <Header />
      <Boards />
    </div>
  );
}

export default App;
