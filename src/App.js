import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import './App.css'
import history from './history.js'
import Login from './components/Login.js'
import ScreenWarning from './components/ScreenWarning.js'
import Home from './components/Home.js'
import Search from './components/search/Search.js'
import UserSongs from './components/Songs.js'
import UserAlbums from './components/Albums.js'
import UserPlaylists from './components/Playlists.js'
import Nav from './components/Nav.js'
import ArtistProfile from './components/ArtistProfile.js'
import Album from './components/Album.js'
import user_token, { spotifyAPI } from './api-calls.js'
import profileImg from './images/profile-img.png'

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
                  <Nav image={(user.images && user.images[0]) ? user.images[0].url : profileImg} user={user} />
                </div>
                <main id="main">
                  <Route path={`/${user.type}/${user.id}`} exact component={() => <Home spotifyAPI={spotifyAPI} />} />
                  <Route path="/search/" component={() => <Search spotifyAPI={spotifyAPI} />} />
                  <Route path="/artist/" component={() => <ArtistProfile spotifyAPI={spotifyAPI} />} />
                  <Route path="/album/" component={() => <Album spotifyAPI={spotifyAPI} />} />
                  <Route path="/playlist/" component={() => <Album playlist spotifyAPI={spotifyAPI} />} />
                  <Route path="/songs/" component={() => <UserSongs spotifyAPI={spotifyAPI} />} />
                  <Route path="/albums/" component={() => <UserAlbums spotifyAPI={spotifyAPI} />} />
                  <Route path="/playlists/" component={() => <UserPlaylists spotifyAPI={spotifyAPI} />} />
                </main>
              </div>)
            : <Login />
            }
          <ScreenWarning/>
        </div>
      </Router>
    );
  }
}

export default App;