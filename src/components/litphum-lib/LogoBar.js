import React from 'react'
import logo from '../../images/litphum-logo.png'

const LogoBar = props => {
  return (
    <div style={{backgroundColor: "black", width: "100%", height: "60px", paddingLeft: "20px", boxSizing: "border-box", display: "grid", zIndex: "5"}}>
      <div style={{display: "grid", gridTemplateColumns: "auto 1fr"}}>
        <img alt="litphum logo" style={{height: "50px", alignSelf: "center"}} src={logo} />
        {props.children}
      </div>
    </div>
  )
}

export default LogoBar