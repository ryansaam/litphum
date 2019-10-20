import React, { useState } from 'react'
import styled from 'styled-components'
import history from '../history.js'
import { useAsync } from "react-async"
import { MediaItemImage, ImageContainer, Header, TextOverflow } from './litphum-lib/litphum-styled.js'
import listArtistsNames from './litphum-lib/listArtistsNames.js'
import PlayBtn from './litphum-lib/PlayBtn.js'
import SongTag from './litphum-lib/SongTag.js'
import msToTime from './litphum-lib/msToTime.js'

const AlbumView = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: auto;
`
const AlbumDetails = styled.div`
  background-color: #101010;
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`
const AlbumSongsContainer = styled.div`
  background-color: #010101;
  height: 100%;
`
const CopyRight = styled.span`
  color: white;
  width: 80%;
  opacity: 0.7;
  fontSize: 12px;
  display: block;
  padding-left: 15px;
`
const AlbumPlayBtn = styled.div`
  background-color: rgb(198, 66, 250);
  color: white;
  height: 40px;
  width: 140px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  margin: 20px auto;
  cursor: pointer;
  opacity: 0.9;
  display: grid;
  align-items: center;
  justify-items: center;
  :hover {
    transform: scale(1.05);
    opacity: 1;
  }
`
const AlbumInfo = styled.span`
  color: white;
  font-size: 12px;
  margin: auto;
  opacity: 0.7;
  text-align: center;
  display: block;
`

const Album = props => {
  const [visiblityBool, setVisiblityBool] = useState(false)
  const albumId = history.location.pathname.split("/").pop()
  const { data: albumData } = useAsync({ 
    promiseFn: props.playlist ? props.spotifyAPI.getPlaylist : props.spotifyAPI.getAlbum,
    watch: albumId,
    id: albumId,
    market: "US"
  })
  const artistsNames = (albumData && !props.playlist) ? listArtistsNames(albumData.artists) : null
  return (
    <AlbumView>
      {albumData ? 
      <>
        <AlbumDetails>
          <MediaItemImage imageMargin={"auto"} size={300} image={albumData.images[0].url}>
            <ImageContainer onMouseEnter={() => setVisiblityBool(true)} onMouseLeave={() => setVisiblityBool(false)} >
              <PlayBtn visibility={visiblityBool} />
            </ImageContainer>
          </MediaItemImage>
          <div style={{maxWidth: "300px", margin: "auto"}}>
          <Header>{albumData.name}</Header>
          <TextOverflow alternate >
            <div style={{display: "inline"}}>
              <span>{artistsNames}</span>
            </div>
          </TextOverflow>
          </div>
          <AlbumPlayBtn>PLAY</AlbumPlayBtn>
          { props.playlist 
            ? <AlbumInfo>{albumData.tracks.total} SONGS</AlbumInfo>
            : <AlbumInfo>{albumData.release_date.split('-')[0]} - {albumData.total_tracks} SONGS</AlbumInfo> }
        </AlbumDetails>
        <AlbumSongsContainer>
          { albumData.tracks.items.map((track, index) => {
            return props.playlist ? (
              <SongTag
                duration={msToTime(track.track.duration_ms)}
                key={track.track.id+index}
                name={track.track.name}
                explicit={track.track.explicit}
                hoverColor={"#101010"}
              />
            ) : (
              <SongTag
                duration={msToTime(track.duration_ms)}
                key={track.id}
                name={track.name}
                explicit={track.explicit}
                hoverColor={"#101010"}
              />
            )
          }) }
          { props.playlist ? null : albumData.copyrights.map((object, index) => {
            return (
              <CopyRight key={index}>{object.text}</CopyRight>
            )
          }) }
        </AlbumSongsContainer>
      </>
      : null }
    </AlbumView>
  )
}

export default Album