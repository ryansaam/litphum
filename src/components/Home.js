import React, { useState, useEffect } from 'react'
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

const ArtistSection = props => {
  const elements = props.items.map(item => {
    return (
      <div key={item.id} onClick={props.handleClick(item.id)}>
        {item.element}
      </div>
    )
  })
  return (
    <div style={{margin: "0px 120px"}}>
    <ArtistSectionContainer>
      {props.children}
      <SlidePicker visibleSlides={4} slidePadding={25} >{elements}</SlidePicker>
    </ArtistSectionContainer>
    </div>
  )
}

const Home = props => {
  const [viewerItems, setViewerItems] = useState(null)
  const { spotifyAPI } = props

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

  const handleClick = (id) => () => {
    window.location = "http://localhost:3000/artist/" + id
  }

  return (
    <section className="home">
      { viewerItems
        ? (<ArtistSection
              handleClick={handleClick}
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
              items={viewerItems}
           >
            <SectionHeaders setMargin={"0px 0px 0px 25px"}>
              <Header hMargin="40px" fontSize="34px" >Recent Songs</Header>
            </SectionHeaders>
           </ArtistSection>)
        : null}
    </section>
  )
}

export default Home