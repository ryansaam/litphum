import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home.js'
import Search from './components/Search.js'
import Trending from './components/Trending.js'
import Nav from './components/Nav.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <div style={{width: "250px", height: "100%", position: "relative", float: "left"}} >
              <Nav />
            </div>
            <main id="main">
              <Route path="/" exact component={Home} />
              <Route path="/search/" component={Search} />
              <Route path="/trending/" component={Trending} />
            </main>
        </div>
      </Router>
    );
  }
}

export default App;
