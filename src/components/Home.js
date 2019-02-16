import React, { useState, useEffect, useRef } from 'react'
import '../css/home.css'
import styled from 'styled-components'
import SlidePicker from './SlidePicker.js'
import { ArtistTag } from './Tags.js'

const ArtistSectionContainer = styled.section`
  padding: 40px 0px;
`
const SectionHeaders = styled.div`
  margin-left: 145px;
`
const Header = styled.h2`
  color: ${props => props.hColor || "white"};
  margin: 0px;
  margin-bottom: ${props => props.hMargin || "0px"};
  font-size: ${props => props.fontSize || "18px"};
`
const ViewerTab = styled.div`
  top: ${props => props.top+"px"};
  left: ${props => props.left+"px"};
  width: 169px;
  position: absolute;
  z-index: 6;
  transition: top 100ms ease 200ms, left ease-in 200ms;
`
const AnimatedView = styled.div`
  transform: translateY(${props => props.translateY || 0}px);
  transition: transform 100ms ease 200ms;
`
const InfoView = styled.div`
  background-color: #cccccc;
  width: 100%;
  height: 500px;
  position: fixed;
  z-index: 5;
  bottom: ${props => props.bottom}px;
  transform: translateY(${props => props.translateY || 0}px);
  transition: bottom ease-in 200ms, transform 100ms ease 200ms;
`
const ViewFunctions = styled.div`
  width: 100%;
  height: 158px;
  position: fixed;
  top: ${props => props.translateY}px;
`
const ViewBtn = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  text-align: center;
  border-radius: 50%;
  position: relative;
  top: 50%;
  opacity: ${props => props.opacity};
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 1px 1px;
  transform: translateY(-50%) translateX(${props => props.translateX || 0}px);
  transition: transform 300ms ease-in, opacity 300ms ease-in;
  :focus {
    outline: none;
    box-shadow: 0 0 2px 2px #1c1c1c;
  } 
`

const ArrowSVG = props => (
  <svg height="32px" id="Layer_1" style={{enableBackground:"new 0 0 32 32"}} version="1.1" viewBox="0 0 32 32" width="32px">
    <path d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
  </svg>
)


const Viewer = props => {
  const [viewerIsShowing, setViewerIsShowing] = useState(false)
  const [targetPosition, setTargetPosition] = useState({x: 0, y: 0})
  const [translateY, setTranslateY] = useState(0)
  const [leftOffset, setLeftOffset] = useState(0)
  const [tagInfo, setTagInfo] = useState({name: "", genre: "", image: ""})
  const [tagIsShowing, setTagIsShowing] = useState(false)
  const [toggleIndex, setToggleIndex] = useState(0b1)

  const position = viewerIsShowing ? -100 : -500

  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setLeftOffset(offset.left)
    return () => offset
  },[])

  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setTargetPosition({x: leftOffset, y: offset.top})
    return () => offset
  },[viewerIsShowing])
  useEffect(() => {
    setTargetPosition({x: leftOffset, y: targetPosition.y})
  },[tagInfo])
  useEffect(() => {
    if (tagIsShowing)
      setTranslateY(-100)
    else
      setTranslateY(0)
  },[viewerIsShowing])

  const handleClick = (name, genre, image) => event => {
    props.onClick()
    const offset = event.currentTarget.getBoundingClientRect()
    setViewerIsShowing(!viewerIsShowing)
    setTagIsShowing(!tagIsShowing)
    setTargetPosition({x: offset.left, y: offset.top})
    setTagInfo({name, genre, image})
    setToggleIndex(~~!toggleIndex)
  }
  const exitView = () => {
    setViewerIsShowing(false)
    setTagIsShowing(false)
    setToggleIndex(1)
  }

  const slideItems = props.children.map((component,index) => (
    <div key={component.id} id={index===0?'test':null} onClick={handleClick(component.name, component.genre, component.imageUrl)}>
      {component.element}
    </div>
  ))

  return (
    <>
      <div style={{margin: "0px 120px", opacity: toggleIndex, transition: "opacity linear 200ms"}}>
        <SlidePicker slidePadding={25} visibleSlides={4} >
          {slideItems}
        </SlidePicker>
      </div>
      <ViewFunctions translateY={tagIsShowing ? 0:-158}>
        <ViewBtn translateX={tagIsShowing ? 60:0} opacity={~~!toggleIndex} onClick={exitView}>
          <ArrowSVG/>
        </ViewBtn>
      </ViewFunctions>
      <InfoView bottom={position} translateY={translateY}/>
      {tagIsShowing ?
          <ViewerTab top={targetPosition.y} left={targetPosition.x} >
            <AnimatedView translateY={translateY}>
              <ArtistTag img={tagInfo.image} artistName={tagInfo.name} genre={tagInfo.genre} />
            </AnimatedView>
          </ViewerTab>
          : 
      null}
    </>
  )
}

const ArtistSection = props => {
  const artistElement = useRef(null)
  const handleClick = () => {
    props.parentRef.current.scrollTo(0, artistElement.current.offsetTop)
    console.log(artistElement.current.offsetTop)
  }
  return (
    <div ref={artistElement}>
    <ArtistSectionContainer>
      {props.children}
      <Viewer onClick={handleClick} parentRef={artistElement.current}>
        {props.items}
      </Viewer>
    </ArtistSectionContainer>
    </div>
  )
}

const Home = props => {
  const [viewerItems, setViewerItems] = useState(null)
  const { spotifyAPI } = props
  const HomeRef = useRef(null)

  useEffect(() => {
    spotifyAPI.getUserArtists(8,'short_term').then(artist => {
      const elements = artist.items.map(item => (
        { name: item.name,
          genre: item.genres[0],
          imageUrl: item.images[2].url,
          id: item.id,
          element: (
            <ArtistTag 
              img={item.images[2].url}
              artistName={item.name}
              genre={item.genres[0]}
            />
          )
        }
      ))
      setViewerItems(elements)
    })
    return () => spotifyAPI.getUserArtists(8,'short_term') 
  },[])

  return (
    <section ref={HomeRef} className="home">
      {viewerItems ? (<ArtistSection parentRef={HomeRef} items={viewerItems}>
        <SectionHeaders>
          <Header hColor="#2ad4ff" >Artists</Header>
          <Header hMargin="40px" fontSize="34px" >Popular</Header>
        </SectionHeaders>
      </ArtistSection>) : null}
      <section className="new-releases-section">
        <SectionHeaders>
          <Header hColor="#26ff13" >Albums</Header>
          <Header hMargin="40px" fontSize="34px" >New Releases</Header>
        </SectionHeaders>
        {viewerItems 
        ? (<SlidePicker slidePadding={25} visibleSlides={4} >
            {viewerItems.map(item => <div key={item.id} >{item.element}</div>)}
           </SlidePicker>)
        : null}
      </section>
    </section>
  )
}

export default Home