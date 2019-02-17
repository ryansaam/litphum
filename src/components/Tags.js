import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import posed from 'react-pose'

const InfoContainer = styled.div`
  max-width: 100%;
  position: relative;
`
const OverFlowContent = styled.div`
  font-size: 20px;
  font-weight: 700;
  opacity: 0.9;
  width: 100%;
  vertical-align: top;
  display: inline-block;
`
const ContentReference = styled.div`
  font-size: 20px;
  font-weight: 700;
  visibility: hidden;
  position: absolute;
  white-space: nowrap;
`
const ContentWrap = styled.span`
  white-space: nowrap;
`
const AnimationReel = posed.div({
  play: {
    transform: "translateX(-100%)",
    transition: { 
      duration: 3000,
      ease: "linear"
    }
  },
  stop: { 
    transform: "translateX(0%)",
    transition: { duration: 0 }
  }
})

const InfoOverflow = props => {
  const content = useRef(null)
  const [contentWidth, setContentWidth] = useState(0)
  useEffect(() => {
    setContentWidth(content.current.clientWidth)
  },[contentWidth])
  console.log(props.isPlaying)
  return (
    <InfoContainer >
      <AnimationReel
        pose={props.isPlaying ? 'play' : 'stop'}
      >
        {props.children}
      </AnimationReel>
      <ContentReference ref={content} >{props.string}</ContentReference>
    </InfoContainer>
  )
}

export const ArtistTag = props => {
  const [isPlaying, setIsPlaying] = useState(false)
  
 
  
  return (
    <div onMouseOver={() => setIsPlaying(true)} onMouseLeave={() => setIsPlaying(false)} className="artist-tag" style={{cursor: "pointer"}}>
      <div className="artist-image-container">
        <div className="artist-img" style={{backgroundImage: `url(${props.img})`}} alt="Artist" />
      </div>
      <div className="artist-span-info-container">
        <InfoOverflow 
          string={props.artistName}
          isPlaying={isPlaying}
        >
          <ContentWrap><OverFlowContent >{props.artistName}</OverFlowContent></ContentWrap>
          <ContentWrap><OverFlowContent >{props.artistName}</OverFlowContent></ContentWrap>
          <ContentWrap><OverFlowContent >{props.artistName}</OverFlowContent></ContentWrap>
        </InfoOverflow>
        <span style={{opacity: "0.6"}} >{props.genre}</span>
      </div>
    </div>
  )
}