import React, { useState, useEffect, useRef } from 'react'
import '../css/home.css'
import styled from 'styled-components'
import SlidePicker from './SlidePicker.js'
import { ArtistTag } from './Tags.js'
import SectionViewer from './Viewer.js'
import ArtistProfile from './ArtistProfile.js'

const ArtistSectionContainer = styled.section`
  padding: 40px 0px;
`
const SectionHeaders = styled.div`
  margin: ${props => (props.setMargin || "0px")};
`
const Header = styled.h2`
  color: ${props => props.hColor || "white"};
  margin: 0px;
  margin-bottom: ${props => props.hMargin || "0px"};
  font-size: ${props => props.fontSize || "18px"};
`

const ArtistSection = props => {
  const artistElement = useRef(null)
  const elements = props.items.map(item => {
    return (
      <div key={item.id} onClick={props.handleClick(artistElement,item.id)}>
        {item.element}
      </div>
    )
  })
  return (
    <div ref={artistElement} style={{margin: "0px 120px"}}>
    <ArtistSectionContainer>
      {props.children}
      <SlidePicker visibleSlides={4} slidePadding={25} >{elements}</SlidePicker>
    </ArtistSectionContainer>
    </div>
  )
}

const Home = props => {
  const [viewerItems, setViewerItems] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [homeWidth, setHomeWidth] = useState(0)
  const [viewerObj, setViewerObj] = useState({})
  const { spotifyAPI } = props
  const HomeRef = useRef(null)

  useEffect(() => {
    spotifyAPI.getUserArtists(8,'short_term').then(artist => {
      const elements = artist.items.map(item => (
        { id: item.id,
          element: (
            <ArtistTag 
              img={item.images[1].url}
              artistName={item.name}
              genre={item.genres[0]}
            />
          )
        }
      ))
      setViewerItems(elements)
      setHomeWidth(HomeRef.current.clientWidth)
    })
    return () => spotifyAPI.getUserArtists(8,'short_term') 
  },[])

  const toggleViewer = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = (ref,id) => () => {
    HomeRef.current.scrollTo(0, ref.current.offsetTop)
    toggleViewer()
    spotifyAPI.getArtistProfile(id,["album"],"US",10)
    .then(data => {
      setViewerObj(data)
    })
  }

  return (
    <section ref={HomeRef} className="home">
      { viewerItems
        ? (<ArtistSection
              handleClick={handleClick}
              parentRef={HomeRef}
              items={viewerItems}
           >
            <SectionHeaders setMargin={"0px 0px 0px 25px"}>
              <Header hColor="#2ad4ff" >Artists</Header>
              <Header hMargin="40px" fontSize="34px" >Top</Header>
            </SectionHeaders>
           </ArtistSection>)
        : null}
        { viewerItems
        ? (<ArtistSection
              handleClick={handleClick}
              parentRef={HomeRef}
              items={viewerItems}
           >
            <SectionHeaders setMargin={"0px 0px 0px 25px"}>
              <Header hMargin="40px" fontSize="34px" >Recent Songs</Header>
            </SectionHeaders>
           </ArtistSection>)
        : null}
      <SectionViewer
        width={homeWidth}
        data={viewerObj}
        isOpen={isOpen}
        toggleViewer={toggleViewer}
      >
        <ArtistProfile data={viewerObj}/>
      </SectionViewer>
    </section>
  )
}

export default Home