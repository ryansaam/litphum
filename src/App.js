import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home.js'
import Search from './components/Search.js'
import Trending from './components/Trending.js'
import Nav from './components/Nav.js'
import user_token, { spotifyAPI } from './api-calls.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      spotifyAPI: {}
    }
  }
  componentDidMount() {
    if (user_token) {
      this.setState({spotifyAPI: new spotifyAPI(user_token)})
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.spotifyAPI !== prevState.spotifyAPI)
      this.state.spotifyAPI.getUserProfile()
      .then(data => this.setState({user: data}))
  }
  
  render() {
    const { user, spotifyAPI } = this.state
    return (
      <Router>
        <div className="App">
            { spotifyAPI.user_token && user
            ? (<>
                <div style={{width: "250px", height: "100%", position: "relative", float: "left"}} >
                  <Nav image={user.images ? user.images[0].url : null} user={user} />
                </div>
                <main id="main">
                  <Route path={`/${user.type}/${user.id}`} exact component={() => <Home spotifyAPI={spotifyAPI} />} />
                  <Route path="/search/" component={Search} />
                  <Route path="/trending/" component={Trending} />
                </main>
              </>) 
            : <div onClick={() => window.location = "http://localhost:8888/login"} >log in</div>
            }
        </div>
      </Router>
    );
  }
}

export default App;
