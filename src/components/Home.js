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



const TagViewer = props => {
  const [topOffset, setTopOffset] = useState(props.tagPosition.y)
  console.log(topOffset)
  const position = props.viewerIsShowing ? 0 : -500

  useEffect(() => {
    if (position === 0) {
      setTopOffset(43)
    }
  })
  useEffect(() => {
    setTopOffset(props.tagPosition.y)
  },[props.tagPosition.y])

  return (
    <div>
      <div className="tag-viewer" style={{bottom: `${position}px`}} >
      </div>
      {props.tagIsShowing ? 
        <div
          id="viewerTab"
          style={{
            width: "169px",
            position: "absolute",
            left: props.tagPosition.x,
            top: topOffset
          }} >
          {props.children}
        </div> : 
      null}
    </div>
  )
}


const Viewer = props => {
  const [viewerIsShowing, setViewerIsShowing] = useState(false)
  const [targetPosition, setTargetPosition] = useState({x: 0, y: 0})
  const [tagIsShowing, setTagIsShowing] = useState(false)

  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setTargetPosition({x: offset.left, y: offset.top})
    return () => offset
  },[targetPosition.y])

  const handleClick = event => {
    setViewerIsShowing(!viewerIsShowing)
    setTagIsShowing(true)
  }

  return (
    <>
      <ArtistSection>
        <div style={{margin: "0px 120px"}}>
          <SectionHeaders>
            <Header hColor="#2ad4ff" >Artists</Header>
            <Header hMargin="40px" fontSize="34px" >Popular</Header>
          </SectionHeaders>
          <SlidePicker slidePadding={25} visibleSlides={4} >
            <ArtistTag id={"test"} onClick={handleClick} img={locationImg} artistName="Kanye West" genre="hip-hop" />
            <ArtistTag img={locationImg} artistName="The Weeknd" genre="soul" />
            <ArtistTag img={locationImg} artistName="Frank Ocean" genre="soul" />
            <ArtistTag img={locationImg} artistName="Kurt Cobain" genre="alternative" />
            <ArtistTag img={locationImg} artistName="Deadmou5" genre="EDM" />
            <ArtistTag img={locationImg} artistName="Prince" genre="pop" />
            <ArtistTag img={locationImg} artistName="Chris Cornell" genre="alternative" />
            <ArtistTag img={locationImg} artistName="XXXTENTACION" genre="hip-hop" />
          </SlidePicker>
        </div>
      </ArtistSection>
      <TagViewer tagIsShowing={tagIsShowing} viewerIsShowing={viewerIsShowing} tagPosition={targetPosition} >
        <ArtistTag img={locationImg} artistName="Kanye West" genre="hip-hop" />
      </TagViewer>
    </>
  )
}

const Home = props => {
  return (
    <section className="home">
      <div className="home-main">
        <Viewer />
      </div>
    </section>
  )
}



{/* <section className="new-releases-section">
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
</section> */}

export default Home