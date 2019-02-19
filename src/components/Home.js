import React, { useState, useEffect, useRef } from 'react'
import '../css/home.css'
import styled from 'styled-components'
import SlidePicker from './SlidePicker.js'
import { ArtistTag } from './Tags.js'

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
const ViewBtn = styled.button`
  width: 50px;
  height: 50px;
  margin-left: 10px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  opacity: ${props => props.opacity};
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 1px 1px;
  transform: translateX(${props => props.translateX || 0}px);
  transition: transform 300ms ease-in 300ms, opacity 300ms ease-in 300ms;
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

const ViewerContainer = styled.div`
  background-color: #ccc;
  width: 100%;
  height: 100%;
  position: fixed;
  top: ${props => (props.translateY || 0)}%;
  z-index: 5;
  transition: top ease 300ms;
`
const SectionViewHeader = styled.div`
  background-image: url(${props => (props.image || null)});
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 300px;
`

const SectionViewer = props => {
  console.log(props.data)
  const translateY = props.isOpen ? 0 : 100
  return (
    <ViewerContainer translateY={translateY}>
      <ViewBtn onClick={props.toggleViewer} translateX={props.isOpen ? 50 : 0} opacity={props.isOpen ? 1 : 0}>
        <ArrowSVG />
      </ViewBtn>
      {props.data.artist
      ? <SectionViewHeader image={props.data.artist.images[0].url}>
        <div style={{
          background: "linear-gradient(120deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)",
          width: "100%",
          height: "100%"
          }}/>  
        </SectionViewHeader>
      : null}
    </ViewerContainer>
  )
}

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
    })
    return () => spotifyAPI.getUserArtists(8,'short_term') 
  },[])

  const toggleViewer = () => {
    setIsOpen(!isOpen)
  }

  const handleClick = (ref,id) => () => {
    HomeRef.current.scrollTo(0, ref.current.offsetTop)
    toggleViewer()
    spotifyAPI.getArtistProfile(id,["album"],"US")
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
      <SectionViewer data={viewerObj} isOpen={isOpen} toggleViewer={toggleViewer} />
    </section>
  )
}

export default Home