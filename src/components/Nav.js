import React from 'react'
import '../css/nav.css'

const ProfileTab = props => {
  return (
    <div className="profile-tab">

    </div>
  )
}

// const search = props => {
//   return (
//     <div>
//       <input type="text" />
//     </div>
//   )
// }

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
          <NavItem>Home</NavItem>
          <NavItem>Search</NavItem>
          <NavItem>Trending</NavItem>
        </ul>
      </section>
      <section className="profile-section" >
        <div>
          <hr style={{border: "0.5px solid #474747", margin: "14px"}} />
          <h3>Your Tastes</h3>
          <ul>
            <NavItem>Your Space</NavItem>
            <NavItem>Playlists</NavItem>
            <NavItem>Songs</NavItem>
            <NavItem>Most Listened</NavItem>
            <NavItem>Favorites</NavItem>
          </ul>
        </div>
        <ProfileTab />
      </section>
    </nav>
  )
}

export default Nav