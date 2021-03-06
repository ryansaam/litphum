import React from 'react'
import { useAsync } from "react-async"
import styled from 'styled-components'
import history from '../history.js'
import SongListItem from './litphum-lib/SongListItem.js'
import listArtistsNames from './litphum-lib/listArtistsNames.js'
import { MediaListContainer } from './litphum-lib/litphum-styled.js'
import AlbumListItem from './litphum-lib/AlbumListItem.js'
import msToTime from './litphum-lib/msToTime.js'
import albumImg from '../images/album-img.svg'


const ArtistProfileContainer = styled.div`
  background-color: #1d1d1d;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
`
const Heading = styled.h2`
  box-sizing: border-box;
  margin: 0px;
  padding: 16px 0px;
  color: white;
  font-size: 40px;
`
const ArtistHeader = styled.div`
  background-image: url(${props => (props.image || null)});
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 300px;
`

const  ArtistProfile = props => {
  const artistId = history.location.pathname.split("/").pop()
  const { data: artistProfileData } = useAsync({ 
    promiseFn: props.spotifyAPI.getArtistProfile,
    watch: artistId,
    id: artistId,
    includdGroups: ["album"],
    market: ["US"],
    limit: 10
  })
  
  return (
    <div style={{backgroundColor: "#1d1d1d", height: "100%"}}>
      {artistProfileData && artistProfileData.artist.images.length 
      ? <ArtistHeader image={artistProfileData.artist.images[0].url}>
          <div style={{
            background: "linear-gradient(120deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)",
            width: "100%",
            height: "100%",
          }}>
            <div style={{
              padding: "20px",
              position: "absolute",
              right: "0px"
            }}>
              <h1 style={{
                backgroundColor: "black",
                padding: "5px",
                color: "#fff",
                margin: "0px",
                fontSize: "3.5em",
                fontWeight: "700",
                boxSizing: "border-box"
              }}>{artistProfileData.artist.name}</h1>
            </div>
          </div>
        </ArtistHeader>
        : null}
      <ArtistProfileContainer>
        <Heading>Top Songs</Heading>
        <ol style={{margin: "0px 0px 20px 0px", padding: "0px", listStyle: "none"}}>
          {artistProfileData ? artistProfileData.artistTopTracks.tracks.map((track, index) => {
            if (index > 4) return null
            return (
              <SongListItem
                image={track.album.images[1].url}
                duration={msToTime(track.duration_ms)}
                key={track.id}
                name={track.name}
                explicit={track.explicit}
                hoverColor={"#181818"}
              />
            )
          })
          : null}
        </ol>
        <Heading>Albums</Heading>
        <MediaListContainer>
          {artistProfileData ? artistProfileData.artistAlbums.items.map(album => {
            return (
              <AlbumListItem
                image={(album.images && album.images[0]) ? album.images[0].url : albumImg}
                name={album.name}
                artistNames={listArtistsNames(album.artists)}
                key={album.id}
                albumId={album.id}
              />
            )
          })
          : null}
        </MediaListContainer>
      </ArtistProfileContainer>
    </div>
  )
}

export default ArtistProfile