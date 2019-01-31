import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.js'
import Nav from './components/Nav.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{width: "250px", height: "100%", position: "relative", float: "left"}} >
          <Nav />
        </div>
        <main>
          <Home />
          <Home />
        </main>
      </div>
    );
  }
}

export default App;
