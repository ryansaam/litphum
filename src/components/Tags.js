import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes, css } from 'styled-components'
import { TextOverflow, ImageContainer, PlayBtn } from './ArtistProfile.js'

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
  white-space: nowrap;
`
const ShortContent = styled.div`
  font-size: 20px;
  font-weight: 700;
  opacity: 0.9;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const ContentWrap = styled.span`
  white-space: nowrap;
`
const ContentReference = styled.div`
  visibility: hidden;
  position: absolute;
  white-space: nowrap;
`
const ContentRefContent = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-right: ${props => (props.spaceBetween || 0)}px;
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
  animation: ${props => (props.isPlaying ? css`${cycle} ${props.length / 6}s linear infinite` : "none")};
  width: ${props => (props.reelWidth+"px" || "100%")};
`
export const Header = styled.div`
  color: white;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin: 5px 0px;
`

const InfoOverflow = props => {
  console.log(props.string.length)
  if (!props.isPlaying)
    return (
      <ShortContent>{props.string}</ShortContent>
    )
  else
    return (
      <InfoContainer>
        <AnimationReel length={props.string.length} reelWidth={props.width} isPlaying={props.isPlaying}>
          <ContentWrap><OverFlowContent>{props.string}</OverFlowContent></ContentWrap>
          <ContentWrap><OverFlowContent>{props.string}</OverFlowContent></ContentWrap>
        </AnimationReel>
      </InfoContainer>
    )
}

export const ArtistCard = props => {
  const infoRef = useRef(null)
  const refContentWidth = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [infoWidth, setInfoWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const spaceBetween = 30
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
        { (infoWidth < contentWidth - spaceBetween)
          ? <InfoOverflow 
              width={contentWidth}
              string={props.artistName}
              isPlaying={isPlaying}
            />
          : <OverFlowContent>{props.artistName}</OverFlowContent>
        }
        <ContentReference ref={refContentWidth}>
          <ContentRefContent spaceBetween={spaceBetween}>{props.artistName}</ContentRefContent>
        </ContentReference>
        <span style={{opacity: "0.6"}} >{props.genre}</span>
      </div>
    </div>
  )
}

export const ArtistResult = props => {
  const [bool,setBool] = useState(false)
  return (
    <div>
      <Link style={{color: "white"}} to={"/artist/"+props.id} >
        <div style={{
          backgroundImage: `url(${props.img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%",
          height: "200px",
          width: "200px",
          marginBottom: "10px"}}
        >
          <ImageContainer style={{backgroundColor: props.bgColor}} circle onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
            <PlayBtn visibility={bool} />
          </ImageContainer>
        </div>
        <div style={{marginBottom: "20px"}}>
          <TextOverflow lineClamp={2}>
            <div style={{display: "inline"}}>
              <span>{props.name}</span>
            </div>
          </TextOverflow>
        </div>
      </Link>
    </div>
  )
}