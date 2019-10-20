import React, { useState } from 'react'
import styled from 'styled-components'
import history from '../history.js'
import { useAsync } from "react-async"
import { TagImage, ImageContainer, Header, TextOverflow } from './litphum-lib/litphum-styled.js'
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
const AlbumSongContainer = styled.div`
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
const Button = styled.div`
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
const Info = styled.span`
  color: white;
  font-size: 12px;
  margin: auto;
  opacity: 0.7;
  text-align: center;
  display: block;
`

const loadAlbumData = ({ api, id }) => {
  const data = api.getAlbum(id, "US")
  return data
}
const loadPlaylistData = ({ api, id }) => {
  const data = api.getPlaylist(id, "US")
  return data
}

const Album = props => {
  const [bool, setBool] = useState(false)
  const id = history.location.pathname.split("/").pop()
  const { data } = useAsync({ 
    promiseFn: props.playlist ? loadPlaylistData : loadAlbumData,
    watch: id,
    api: props.spotifyAPI, id
  })
  const artistsNames = (data && !props.playlist) ? listArtistsNames(data.artists) : null
  return (
    <AlbumView>
      {data ? 
      <>
        <AlbumDetails>
          <TagImage imageMargin={"auto"} size={300} image={data.images[0].url}>
            <ImageContainer onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
              <PlayBtn visibility={bool} />
            </ImageContainer>
          </TagImage>
          <div style={{maxWidth: "300px", margin: "auto"}}>
          <Header>{data.name}</Header>
          <TextOverflow>
            <div style={{display: "inline"}}>
              <span>{artistsNames}</span>
            </div>
          </TextOverflow>
          </div>
          <Button>PLAY</Button>
          { props.playlist 
            ? <Info>{data.tracks.total} SONGS</Info>
            : <Info>{data.release_date.split('-')[0]} - {data.total_tracks} SONGS</Info> }
        </AlbumDetails>
        <AlbumSongContainer>
          { data.tracks.items.map((track, index) => {
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
          { props.playlist ? null : data.copyrights.map((object, index) => {
            return (
              <CopyRight key={index}>{object.text}</CopyRight>
            )
          }) }
        </AlbumSongContainer>
      </>
      : null }
    </AlbumView>
  )
}

export default Album