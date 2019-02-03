import React, { useState, useEffect } from 'react'
import '../css/home.css'
import styled from 'styled-components'
import SlidePicker from './SlidePicker.js'
import { ArtistTag } from './Tags.js'
import locationImg from '../images/location-photo.jpeg'


const ArtistSection = styled.section`
  padding-bottom: 40px;
`
const SectionHeaders = styled.div`
  margin-left: 24px;
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

const artistInfo = {
  artist0: {
    artistName:"Kanye West",
    genre:"hip-hop"
  },
  artist1: {
    artistName:"The Weeknd",
    genre:"soul"
  },  
  artist2: {
    artistName:"Frank Ocean",
    genre:"soul"
  },
  artist3: {
    artistName:"Kurt Cobain",
    genre:"alternative"
  },  
  artist4: {
    artistName:"Deadmou5",
    genre:"EDM"
  },
  artist5: {
    artistName:"Prince",
    genre:"pop"
  },
  artist6: {
    artistName:"Chris Cornell",
    genre:"alternative"
  },
  artist7: { 
    artistName:"XXXTENTACION",
    genre:"hip-hop"
  }
}

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
  const [tagInfo, setTagInfo] = useState({name: "", genre: ""})
  const [tagIsShowing, setTagIsShowing] = useState(false)
  const [toggleIndex, setToggleIndex] = useState(0b1)

  const position = viewerIsShowing ? -100 : -500

  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setLeftOffset(offset.left)
  },[])

  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setTargetPosition({x: leftOffset, y: offset.top})
    return () => offset
  },[viewerIsShowing])
  useEffect(() => {
    setTargetPosition({x: leftOffset, y: targetPosition.y})
    console.log(targetPosition.y)
  },[tagInfo])
  useEffect(() => {
    if (tagIsShowing)
      setTranslateY(-100)
    else
      setTranslateY(0)
  },[viewerIsShowing])

  const handleClick = (name, genre, event) => {
    setViewerIsShowing(!viewerIsShowing)
    setTagIsShowing(!tagIsShowing)
    const offset = event.currentTarget.getBoundingClientRect()
    setTargetPosition({x: offset.left, y: offset.top})
    setTagInfo({name, genre})
    setToggleIndex(~~!toggleIndex)
  }
  const exitView = () => {
    setViewerIsShowing(false)
    setTagIsShowing(false)
    setToggleIndex(1)
  }

  const slideItems = Object.keys(artistInfo).map((key, index) => (
    <ArtistTag 
      id={key==="artist0"?'test':null} 
      key={key} img={locationImg}
      artistName={artistInfo[key].artistName}
      genre={artistInfo[key].genre}
      onClick={handleClick}
      canClick
    />
  ))

  return (
    <>
      <ArtistSection>
        <div style={{margin: "0px 120px", opacity: toggleIndex, transition: "opacity linear 200ms"}}>
          <SectionHeaders>
            <Header hColor="#2ad4ff" >Artists</Header>
            <Header hMargin="40px" fontSize="34px" >Popular</Header>
          </SectionHeaders>
          <SlidePicker slidePadding={25} visibleSlides={4} >
            {slideItems}
          </SlidePicker>
        </div>
      </ArtistSection>
      <ViewFunctions translateY={tagIsShowing ? 0:-158}>
        <ViewBtn translateX={tagIsShowing ? 60:0} opacity={~~!toggleIndex} onClick={exitView}>
          <ArrowSVG/>
        </ViewBtn>
      </ViewFunctions>
      <InfoView bottom={position} translateY={translateY}/>
      {tagIsShowing ?
          <ViewerTab top={targetPosition.y} left={targetPosition.x} >
            <AnimatedView translateY={translateY}>
              <ArtistTag img={locationImg} artistName={tagInfo.name} genre={tagInfo.genre} />
            </AnimatedView>
          </ViewerTab>
          : 
      null}
    </>
  )
}

const Home = props => {
  return (
    <section className="home">
      <div className="home-main">
        <Viewer />
      </div>
      <section className="new-releases-section">
          <SectionHeaders>
            <Header hColor="#26ff13" >Albums</Header>
            <Header hMargin="40px" fontSize="34px" >New Releases</Header>
          </SectionHeaders>
          <SlidePicker slidePadding={25} visibleSlides={4} >
            <ArtistTag img={locationImg} artistName="Kanye West" genre="hip-hop" />
            <ArtistTag img={locationImg} artistName="The Weeknd" genre="soul" />
            <ArtistTag img={locationImg} artistName="Frank Ocean" genre="soul" />
            <ArtistTag img={locationImg} artistName="Kurt Cobain" genre="alternative" />
            <ArtistTag img={locationImg} artistName="Deadmou5" genre="EDM" />
            <ArtistTag img={locationImg} artistName="Prince" genre="pop" />
            <ArtistTag img={locationImg} artistName="Chris Cornell" genre="alternative" />
            <ArtistTag img={locationImg} artistName="XXXTENTACION" genre="hip-hop" />
          </SlidePicker>
        </section>
    </section>
  )
}

export default Home