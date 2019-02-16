import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import '../css/nav.css'

const ProfileContainer = styled.div`
  padding: 5px;
  text-decoration: none;
`
const Avitar = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  float: left;
`
const ProfileLink = styled.span`
  display: block;
  margin: 5px 0px;
  color: black;
  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`

const ProfileTab = props => {
  const handleSignOut = () => {
    sessionStorage.removeItem("access_token")
    window.location = "http://localhost:3000/"
  }
  return (
    <div className="profile-tab">
      <ProfileContainer>
        <Avitar src={props.image} />
        <ProfileLink onClick={handleSignOut} >Sign Out</ProfileLink>
        <Link to="/profile/"><ProfileLink>View Profile</ProfileLink></Link>
      </ProfileContainer>
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
  const { type, id } = props.user
  return (
    <nav className="nav">
      <section>
        <ul>
          <Link to={`/${type}/${id}`} ><NavItem>Home</NavItem></Link>
          <Link to="/search/" ><NavItem>Search</NavItem></Link>
          <Link to="/trending/"><NavItem>Trending</NavItem></Link>
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
        <ProfileTab image={props.image} />
      </section>
    </nav>
  )
}

export default Nav