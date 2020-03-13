import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LogoBar from './litphum-lib/LogoBar.js'
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
    window.location = window._env_.REACT_APP_URL
  }
  return (
    <div className="profile-tab">
      <ProfileContainer>
        <Avitar src={props.image} />
        <ProfileLink onClick={handleSignOut} >Sign Out</ProfileLink>
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
      <LogoBar />
      <section>
        <ul>
          <Link to={`/${type}/${id}`} ><NavItem>Home</NavItem></Link>
          <Link to="/search/" ><NavItem>Search</NavItem></Link>
        </ul>
      </section>
      <section className="profile-section" >
        <div>
          <hr style={{border: "0.5px solid #474747", margin: "14px"}} />
          <h3 style={{color: "white"}}>Your Tastes</h3>
          <ul>
            <Link to="/songs/" ><NavItem>Songs</NavItem></Link>
            <Link to="/albums/" ><NavItem>Albums</NavItem></Link>
            <Link to="/playlists/" ><NavItem>Playlists</NavItem></Link>
          </ul>
        </div>
        <ProfileTab image={props.image} />
      </section>
    </nav>
  )
}

export default Nav