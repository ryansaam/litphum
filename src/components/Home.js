import React, { useState, useEffect } from 'react'
import '../css/home.css'
import styled from 'styled-components'
import SlidePicker from './SlidePicker.js'
import { ArtistCard } from './Tags.js'
import history from '../history.js'

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

// Make Track Card to replace dummy Artist card // test
// const TrackCard = props => {
//   return (
//     <div></div>
//   )
// }

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
  const [trackItems, setTrackItems] = useState(null)
  const { spotifyAPI } = props

  useEffect(() => {
    spotifyAPI.getUserArtists(8,'short_term').then(artist => {
      const elements = artist.items.map(item => (
        { id: item.id,
          element: (
            <ArtistCard
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
  },[spotifyAPI])

  useEffect(() => {
    spotifyAPI.getUserTracks(8,'short_term').then(track => {
      const elements = track.items.map(item => (
        { id: item.id,
          element: (
            <ArtistCard
              img={item.album.images[1].url}
              artistName={item.name}
              genre={item.track_number}
            />
          )
        }
      ))
      console.log(track)
      setTrackItems(elements)
    })
    return () => spotifyAPI.getUserTracks(8,'short_term') 
  },[spotifyAPI])

  const handleClick = (id) => () => {
    history.push('/artist/'+id)
  }
  const playTrack = () => {
    console.log("track is playing")
  }
  console.log(trackItems)
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
        { trackItems
        ? (<ArtistSection
              handleClick={playTrack}
              items={trackItems}
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