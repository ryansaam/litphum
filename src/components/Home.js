import React, { useState, useEffect } from 'react'
import '../css/home.css'
import styled from 'styled-components'
import { Artists } from './search/Search.js'
import SongTag, { msToTime } from './SongTag.js'
 
const TrackSectionContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const Home = props => {
  const [artistsItems, setArtistsItems] = useState(null)
  const [trackItems, setTrackItems] = useState(null)
  const { spotifyAPI } = props

  useEffect(() => {
    spotifyAPI.getUserArtists(8,'short_term')
    .then(artist => { setArtistsItems(artist.items) })
    return () => spotifyAPI.getUserArtists(8,'short_term') 
  },[spotifyAPI])

  useEffect(() => {
    spotifyAPI.getUserTracks(8,'short_term')
    .then(track => { setTrackItems(track.items) })
    return () => spotifyAPI.getUserTracks(8,'short_term') 
  },[spotifyAPI])
  console.log(artistsItems)
  return (
    <section className="home">
      <div style={{padding: "0px 40px"}}>
        <SectionHeaders setMargin={"0px 0px 0px 25px"}>
          <Header hColor="#2ad4ff" >Artists</Header>
          <Header hMargin="40px" fontSize="34px" >Top</Header>
        </SectionHeaders>
        {artistsItems ? <Artists artists={artistsItems} /> : null}
      </div>
      <div style={{padding: "0px 40px", marginTop: "40px"}}>
        <SectionHeaders setMargin={"0px 0px 0px 25px"}>
          <Header hColor="#2ad4ff" >Songs</Header>
          <Header hMargin="40px" fontSize="34px" >Recent</Header>
        </SectionHeaders>
        {trackItems ? 
        <TrackSectionContainer>
          {trackItems.map( track => 
            <SongTag
              image={track.album.images[1].url}
              duration={msToTime(track.duration_ms)}
              key={track.id}
              name={track.name}
              explicit={track.explicit}
              hoverColor={"rgba(255, 255, 255, 0.4)"}
            />
          )} 
        </TrackSectionContainer> : null}
      </div>
    </section>
  )
}

export default Home