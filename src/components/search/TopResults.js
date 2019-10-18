import React, { useState } from 'react'
import styled from 'styled-components'
import { TagImage, PlayBtn, ImageContainer, Header, TextOverflow, listArtistsNames } from '../Album.js'
import SongTag, { msToTime } from '../SongTag.js'
import { AlbumTag, AlbumContainer } from '../ArtistProfile.js'
import { ArtistResult } from '../Tags.js'
import profileImg from '../../images/profile-img.png'
import albumImg from '../../images/album-img.svg'
import NullElement from '../litphum-lib/NullElement.js'

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
  const [bool, setBool] = useState(false)
  const artistsNames = props.data.tracks.total ? listArtistsNames(props.data.tracks.items[0].artists) : null
  console.log(props.data.artists.length)
  return (
    <>
      {props.filter}
      <TopResultsContainer>
        { props.data.tracks.total
        ? <SongResults>
            <div style={{marginRight: "20px"}}>
              <TagImage imageMargin={"auto"} size={"300px"} image={props.data.tracks.items[0].album.images[0].url}>
                <ImageContainer onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
                  <PlayBtn visibility={bool} />
                </ImageContainer>
              </TagImage>
              <div style={{maxWidth: "300px", margin: "auto"}}>
                <Header>{props.data.tracks.items[0].name}</Header>
                <TextOverflow>
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
                    <SongTag
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
        : <NullElement bgColor={"rgba(0,0,0,0.6)"} height={400} size={24}>no results</NullElement>}
        <Heading>Artists</Heading>
        { props.data.artists.items.length ?
          <AlbumContainer>
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
          </AlbumContainer>
        : <NullElement bgColor={"rgba(0,0,0,0.6)"} height={200} size={24}>no artist found</NullElement> }
        <Heading>Albums</Heading>
        { props.data.albums.items.length ?
          <AlbumContainer>
            { props.data.albums.items.map((album, index) => {
              if (index > 9) return null
              return (
                <AlbumTag
                  image={album.images[0].url}
                  name={album.name}
                  artistNames={listArtistsNames(album.artists)}
                  key={album.id}
                  albumId={album.id}
                />
              )
            }) }
          </AlbumContainer>
        : <NullElement bgColor={"rgba(0,0,0,0.6)"} height={200} size={24}>no albums found</NullElement> }
        <Heading>Playlists</Heading>
        { props.data.playlists.items.length ?
          <AlbumContainer>
            { props.data.playlists.items.map((playlist, index) => {
              if (index > 9) return null
              return (
                <AlbumTag
                  image={playlist.images[0].url ? playlist.images[0].url : albumImg}
                  name={playlist.name}
                  key={playlist.id}
                  albumId={playlist.id}
                  playlist
                />
              )
            }) }
          </AlbumContainer>
        : <NullElement bgColor={"rgba(0,0,0,0.6)"} height={200} size={24}>no playlists found</NullElement> }
      </TopResultsContainer>
    </>
  )
}

export default TopResults