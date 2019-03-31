import React, { Component } from 'react'
import { Router, Route} from 'react-router-dom'
import './App.css'
import history from './history.js'
import Home from './components/Home.js'
import Search from './components/search/Search.js'
import Trending from './components/Trending.js'
import Nav from './components/Nav.js'
import ArtistProfile from './components/ArtistProfile.js'
import Album from './components/Album.js'
import YourSpace from './components/YourSpace.js'
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
      sessionStorage.setItem('access_token', user_token)
      this.setState({
        spotifyAPI: new spotifyAPI( user_token )
      })
    } else if (sessionStorage.getItem('access_token')) {
      this.setState({
        spotifyAPI: new spotifyAPI( sessionStorage.getItem('access_token') )
      })
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
      <Router history={history}>
        <div className="App">
            { (spotifyAPI.user_token && user)
            ? (<div className="logged-in">
                <div style={{width: "250px", height: "100%", position: "relative", float: "left"}} >
                  <Nav image={user.images ? user.images[0].url : null} user={user} />
                </div>
                <main id="main">
                  <Route path={`/${user.type}/${user.id}`} exact component={() => <Home spotifyAPI={spotifyAPI} />} />
                  <Route path="/search/" component={() => <Search spotifyAPI={spotifyAPI} />} />
                  <Route path="/trending/" component={Trending} />
                  <Route path="/artist/" component={() => <ArtistProfile spotifyAPI={spotifyAPI} />} />
                  <Route path="/album/" component={() => <Album spotifyAPI={spotifyAPI} />} />
                  <Route path="/playlist/" component={() => <Album playlist spotifyAPI={spotifyAPI} />} />
                  <Route path="/your-space/" component={() => <YourSpace spotifyAPI={spotifyAPI} />} />
                </main>
              </div>)
            : <div onClick={() => window.location = "http://localhost:8888/login"} >log in</div>
            }
        </div>
      </Router>
    );
  }
}

export default App;
