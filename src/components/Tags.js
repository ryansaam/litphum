import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

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
const cycle = keyframes`
  from {
    transform: translateX(0%)
  }
  to {
    transform: translateX(-100%)
  }
`
const AnimationReel = styled.div`
  animation: ${props => (props.isPlaying ? css`${cycle} 3s linear infinite` : "none")}
`

const InfoOverflow = props => {
  return (
    <InfoContainer >
      <AnimationReel isPlaying={props.isPlaying}>
        <ContentWrap><OverFlowContent >{props.string}</OverFlowContent></ContentWrap>
        <ContentWrap><OverFlowContent >{props.string}</OverFlowContent></ContentWrap>
      </AnimationReel>
      <ContentReference>{props.string}</ContentReference>
    </InfoContainer>
  )
}

export const ArtistTag = props => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <div
      onMouseOver={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}
      className="artist-tag"
      style={{cursor: "pointer"}}
    >
      <div className="artist-image-container">
        <div className="artist-img" style={{backgroundImage: `url(${props.img})`}} alt="Artist" />
      </div>
      <div className="artist-span-info-container">
        <InfoOverflow string={props.artistName} isPlaying={isPlaying} />
        <span style={{opacity: "0.6"}} >{props.genre}</span>
      </div>
    </div>
  )
}