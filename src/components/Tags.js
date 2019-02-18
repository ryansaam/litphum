import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

const InfoContainer = styled.div`
  position: relative;
`
const OverFlowContent = styled.div`
  font-size: 20px;
  font-weight: 700;
  min-width: 100%;
  opacity: 0.9;
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
  animation: ${props => (props.isPlaying ? css`${cycle} 3s linear infinite` : "none")};
  width: ${props => (props.width || "100%")}px;
`

const InfoOverflow = props => {
  if (props.width[0] < props.width[1]) {
    return (
      <InfoContainer>
        <AnimationReel width={props.width[1]} isPlaying={props.isPlaying}>
          <ContentWrap><OverFlowContent>{props.string}</OverFlowContent></ContentWrap>
          <ContentWrap><OverFlowContent>{props.string}</OverFlowContent></ContentWrap>
        </AnimationReel>
      </InfoContainer>
    )
  }
  return (
    <OverFlowContent>{props.string}</OverFlowContent>
  )
}

export const ArtistTag = props => {
  const infoRef = useRef(null)
  const refContentWidth = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [infoWidth, setInfoWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  
  useEffect(() => {
    setInfoWidth(infoRef.current.clientWidth)
    setContentWidth(refContentWidth.current.clientWidth)
  },[])

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
      <div ref={infoRef} className="artist-span-info-container">
        <InfoOverflow width={[infoWidth,contentWidth]} string={props.artistName} isPlaying={isPlaying} />
        <ContentReference ref={refContentWidth}>{props.artistName}</ContentReference>
        <span style={{opacity: "0.6"}} >{props.genre}</span>
      </div>
    </div>
  )
}