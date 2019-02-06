import React from 'react'
import { Link } from 'react-router-dom';
import '../css/nav.css'

const ProfileTab = props => {
  return (
    <div className="profile-tab">

    </div>
  )
}

const NavItem = props => {
  return (
    <li>
      <div>
        <span>{props.children}</span>
      </div>
    </li>
  )
}

const Nav = props => {
  return (
    <nav className="nav">
      <section>
        <ul>
          <Link to="/" ><NavItem>Home</NavItem></Link>
          <Link to="/search/" ><NavItem>Search</NavItem></Link>
          <Link to="/tending/"><NavItem>Trending</NavItem></Link>
        </ul>
      </section>
      <section className="profile-section" >
        <div>
          <hr style={{border: "0.5px solid #474747", margin: "14px"}} />
          <h3>Your Tastes</h3>
          <ul>
          <Link to="/your-space/" ><NavItem>Your Space</NavItem></Link>
          <Link to="/playlists/" ><NavItem>Playlists</NavItem></Link>
          <Link to="/songs/" ><NavItem>Songs</NavItem></Link>
          <Link to="/most-listened/" ><NavItem>Most Listened</NavItem></Link>
          <Link to="/favorites/" ><NavItem>Favorites</NavItem></Link>
          </ul>
        </div>
        <ProfileTab />
      </section>
    </nav>
  )
}

export default Nav