import React from 'react'
import styled from 'styled-components'
import LogoBar from './litphum-lib/LogoBar.js'
import shape from '../images/login.svg'
import websitePreview from '../images/litphum-preview.png'

const LoginContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`

const LoginBtn = styled.button`
  background-color: #1db954;
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 60px;
  border-radius: 35px;
  border-width: 0px;
  outline: none;
  cursor: pointer;
  :hover {
    background-color: #1ed760;
  }
`

const Login = () => {
  return (
    <div style={{height: "100%"}}>
      <LoginContainer>
        <LogoBar>
          <LoginBtn style={{alignSelf: "center", justifySelf: "right"}} onClick={() => window.location = `${process.env.REACT_APP_AUTH_LOGIN_URL}/login`}>
            LOG IN WITH SPOTIFY
          </LoginBtn>
        </LogoBar>
        <div style={{position: "relative"}}>
          <div style={{margin: "20px 40px"}}>
            <h4 style={{fontSize: "36px", margin: "0px"}}>See Spotify in a new perspective using litphum.</h4>
            <h4 style={{fontSize: "36px", margin: "0px"}}>A new design for Spotify!</h4>
          </div>
          <p style={{
            width: "560px",
            color: "white",
            fontSize: "32px", 
            position: "absolute", 
            bottom: "0", 
            right: "0", 
            zIndex: "5",
            transform: "translate(-40px, -160px)"
          }}>A quick way to view your songs, albums, and playlists. See something missing? Just search it up using the litphum search.</p>
          <img alt="preview of website" style={{
            height: "300px",
            border: "3px solid rgb(25, 25, 25)",
            borderRadius: "8px",
            position: "absolute",
            transform: "translate(150px, 150px)",
            zIndex: "5"
          }} src={websitePreview}/>
        </div>
      </LoginContainer>
      <img alt="shape" style={{height: "100%", position: "absolute", right: "0", top: "0"}} src={shape}/>
    </div>
  )
}

export default Login