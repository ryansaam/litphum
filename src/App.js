import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home.js'
import Search from './components/Search.js'
import Trending from './components/Trending.js'
import Nav from './components/Nav.js'
import user_id from './api-calls'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            { user_id ?
            (<><div style={{width: "250px", height: "100%", position: "relative", float: "left"}} >
              <Nav />
            </div>
            <main id="main">
              <Route path="/" exact component={Home} />
              <Route path="/search/" component={Search} />
              <Route path="/trending/" component={Trending} />
            </main></>) : <div onClick={() => window.location = "http://localhost:8888/login"} >log in</div>
            }
        </div>
      </Router>
    );
  }
}

export default App;
