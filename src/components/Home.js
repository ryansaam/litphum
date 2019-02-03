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
  transition: top 100ms ease 120ms, left ease-in 300ms;
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



const TagViewer = props => {
  const position = props.viewerIsShowing ? 0 : -500
  return (
    <div >
      <div className="tag-viewer" style={{bottom: `${position}px`}} />
      {props.children}
    </div>
  )
}


const Viewer = props => {
  const [viewerIsShowing, setViewerIsShowing] = useState(false)
  const [targetPosition, setTargetPosition] = useState({x: 0, y: 0})
  const [tagInfo,setTagInfo] = useState({name: "", genre: ""})
  const [tagIsShowing, setTagIsShowing] = useState(false)

  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setTargetPosition({x: offset.left, y: offset.top})
    return () => offset
  },[viewerIsShowing])

  const handleClick = (name, genre, event) => {
    setViewerIsShowing(!viewerIsShowing)
    setTagIsShowing(!tagIsShowing)
    const offset = event.currentTarget.getBoundingClientRect()
    setTargetPosition({x: offset.left, y: offset.top})
    setTagInfo({name, genre})
    console.log(name,genre,event,offset.left,offset.top)
  }
  useEffect(() => {
    const offset = document.getElementById("test").getBoundingClientRect()
    setTargetPosition({x: offset.left, y: 43})
    console.log(targetPosition.y)
    return () => offset
  },[tagInfo])

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
        <div style={{margin: "0px 120px"}}>
          <SectionHeaders>
            <Header hColor="#2ad4ff" >Artists</Header>
            <Header hMargin="40px" fontSize="34px" >Popular</Header>
          </SectionHeaders>
          <SlidePicker slidePadding={25} visibleSlides={4} >
            {slideItems}
          </SlidePicker>
        </div>
      </ArtistSection>
      <TagViewer
        viewerIsShowing={viewerIsShowing}
      >
        {tagIsShowing ? 
          <ViewerTab top={targetPosition.y} left={targetPosition.x} >
            <ArtistTag img={locationImg} artistName={tagInfo.name} genre={tagInfo.genre} />
          </ViewerTab> : 
        null}
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