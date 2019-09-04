import React from 'react'
import styled from 'styled-components'

const LoginContainer = styled.div`
  background: linear-gradient(120deg, rgb(198, 66, 250) 0%, rgb(80, 255, 153) 60%,rgb(0, 144, 211));
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
`

const LoginBtn = styled.button`
  background-color: #1db954;
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 100px;
  border-radius: 35px;
  border-width: 0px;
  outline: none;
  cursor: pointer;
  :hover {
    background-color: #1ed760;
  }
`

const Login = props => {
  return (
    <LoginContainer>
      <LoginBtn onClick={() => window.location = "http://localhost2/login"}>
       LOG IN WITH SPOTIFY
      </LoginBtn>
    </LoginContainer>
  )
}

export default Login