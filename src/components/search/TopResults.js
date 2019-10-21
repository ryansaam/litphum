import React, { useState } from 'react'
import styled from 'styled-components'
import PlayBtn from '../litphum-lib/PlayBtn.js'
import listArtistsNames from '../litphum-lib/listArtistsNames.js'
import SongListItem from '../litphum-lib/SongListItem.js'
import { MediaListContainer, MediaItemImage, Header, ImageContainer, TextOverflow } from '../litphum-lib/litphum-styled.js'
import ArtistResult from '../litphum-lib/ArtistResult.js'
import NullResult from '../litphum-lib/NullResult.js'
import AlbumListItem from '../litphum-lib/AlbumListItem.js'
import msToTime from '../litphum-lib/msToTime.js'
import profileImg from '../../images/profile-img.png'
import albumImg from '../../images/album-img.svg'

const TopResultsContainer = styled.div`
  padding: 0px 20px 20px 20px;
`
const SongResults = styled.div`
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
`
const Heading = styled.h2`
  box-sizing: border-box;
  margin: 25px 0px 0px 0px;
  padding: 16px 0px;
  color: white;
  font-size: 40px;
`

const TopResults = props => {
  const [visibilityBool, setVisibilityBool] = useState(false)
  const artistsNames = props.data.tracks.total ? listArtistsNames(props.data.tracks.items[0].artists) : null

  return (
    <>
      {props.filter}
      <TopResultsContainer>
        { props.data.tracks.total
        ? <SongResults>
            <div style={{marginRight: "20px"}}>
              <MediaItemImage imageMargin={"auto"} size={300} image={props.data.tracks.items[0].album.images[0].url}>
                <ImageContainer onMouseEnter={() => setVisibilityBool(true)} onMouseLeave={() => setVisibilityBool(false)} >
                  <PlayBtn visibility={visibilityBool} />
                </ImageContainer>
              </MediaItemImage>
              <div style={{maxWidth: "300px", margin: "auto"}}>
                <Header>{props.data.tracks.items[0].name}</Header>
                <TextOverflow alternate >
                  <div style={{display: "inline"}}>
                    <span>{artistsNames}</span>
                  </div>
                </TextOverflow>
              </div>
            </div>
            <div>
              { props.data.tracks.items.map((track, index) => {
                  if (index > 4) return null
                  return (
                    <SongListItem
                      duration={msToTime(track.duration_ms)}
                      key={track.id}
                      name={track.name}
                      explicit={track.explicit}
                      hoverColor={"#101010"}
                    />
                  )
              }) }
            </div>
          </SongResults>
        : <NullResult bgColor={"rgba(0,0,0,0.6)"} height={400} size={24}>no results</NullResult>}
        <Heading>Artists</Heading>
        { props.data.artists.items.length ?
          <MediaListContainer>
            { props.data.artists.items.map((artist, index) => {
              if (index > 9) return null
              return (
                <ArtistResult
                  img={artist.images[0] ? artist.images[0].url : profileImg}
                  name={artist.name}
                  bgColor={artist.images[0] ? null : "rgba(0,0,0,0.6)"}
                  key={artist.id}
                  id={artist.id}
                />
              )
            }) }
          </MediaListContainer>
        : <NullResult bgColor={"rgba(0,0,0,0.6)"} height={200} size={24}>no artist found</NullResult> }
        <Heading>Albums</Heading>
        { props.data.albums.items.length ?
          <MediaListContainer>
            { props.data.albums.items.map((album, index) => {
              if (index > 9) return null
              return (
                <AlbumListItem
                  image={album.images[0].url}
                  name={album.name}
                  artistNames={listArtistsNames(album.artists)}
                  key={album.id}
                  albumId={album.id}
                />
              )
            }) }
          </MediaListContainer>
        : <NullResult bgColor={"rgba(0,0,0,0.6)"} height={200} size={24}>no albums found</NullResult> }
        <Heading>Playlists</Heading>
        { props.data.playlists.items.length ?
          <MediaListContainer>
            { props.data.playlists.items.map((playlist, index) => {
              if (index > 9) return null
              return (
                <AlbumListItem
                  image={playlist.images[0].url ? playlist.images[0].url : albumImg}
                  name={playlist.name}
                  key={playlist.id}
                  albumId={playlist.id}
                  playlist
                />
              )
            }) }
          </MediaListContainer>
        : <NullResult bgColor={"rgba(0,0,0,0.6)"} height={200} size={24}>no playlists found</NullResult> }
      </TopResultsContainer>
    </>
  )
}

export default TopResults