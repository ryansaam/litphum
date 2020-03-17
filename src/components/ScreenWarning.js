import React from 'react'
import disableScroll from 'disable-scroll'
import styled from 'styled-components'

const ScreenWarning = props => {
  if (window.innerWidth < 1000)
    disableScroll.on()
  return (
    <ScreenWarningWrap style={{display: (window.innerWidth < 1000) ? "grid": "none"}}>
      <Prompt>
        <div style={{display: "grid", gridGap: "10px"}}>
          <span>
            <h1 style={{color: "#a1a1a1", fontSize: "1.3em", fontWeight:"600", marginRight: "10px", display: "inline"}}>
              Screen Warning:
            </h1>
            <P>This site represents a desktop application therefore is avalible on laptop/desktop computers only.</P>
          </span>
          <span>
            <h1 style={{color: "#a1a1a1", fontSize: "1.3em", fontWeight:"600", marginRight: "10px", display: "inline"}}>
              Recommended Width:
            </h1>
            <P>{warnText}</P>
          </span>
          <P>You may view the demo on my portfolio if you would like!</P>
          <Link href="https://aboutryansam.com">View Demo</Link>
        </div>
      </Prompt>
    </ScreenWarningWrap>
  )
}
const ScreenWarningWrap = styled.div`
  background-color: rgb(0,0,0);
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  z-index: 22;
  display: grid;
  align-items: center;
  justify-items: center;
`
const Prompt = styled.div`
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  max-width: 600px;
  padding: 40px;
  box-sizing: border-box;
  border: 3px solid #a1a1a1;
  border-radius: 20px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-gap: 10px;
`
const P = styled.p`
  color: white;
  font-size: 1.2em;
  margin: 0px;
  display: inline;
`
const Button = styled.button`
  background-color: #1db954;
  color: white;
  width: 160px;
  height: 40px;
  font-size: 1em;
  font-weight: 600;
  justify-self: ${ props => props.move || "center" };
  border-radius: 20px;
  border: none;
  outline: none;
  :hover {
    background-color: #1ed760;
  }
  @media (max-width: 480px) {
    width: 140px;
  }
  @media (max-width: 380px) {
    width: 120px;
  }
`
const Link = props => {
  return (
    <a style={{justifySelf: props.move || "center"}} href={props.href} target={"_blank"} rel="noopener noreferrer" >
      <Button>{props.children}</Button>
    </a>
  )
}
const warnText = `
  (1024px - 2560px)
`

export default ScreenWarning