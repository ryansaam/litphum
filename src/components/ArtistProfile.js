import React, { useRef, useState } from 'react'
import { useAsync } from "react-async"
import { Link } from "react-router-dom"
import styled from 'styled-components'
import history from '../history.js'
import SongTag, { TagImage, msToTime } from './SongTag.js'
import { listArtistsNames } from './Album.js'

export const PlayBtn = props => (
  <svg style={{visibility: props.visibility ? "visible" : "hidden" }} fill="white" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
    <path id="control-play" d="m40,30c0,0.34 -0.173,0.657 -0.459,0.841l-10.01,6.435c-0.466,0.298 -1.083,0.164 -1.382,-0.299c-0.298,-0.465 -0.164,-1.083 0.3,-1.382l8.702,-5.595l-11.151,-7.168l0,16.168c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1l0,-18c0,-0.366 0.2,-0.702 0.521,-0.878c0.32,-0.175 0.711,-0.163 1.02,0.037l14,9c0.286,0.184 0.459,0.501 0.459,0.841m-10,28c-15.439,0 -28,-12.561 -28,-28c0,-15.439 12.561,-28 28,-28c15.439,0 28,12.561 28,28c0,15.439 -12.561,28 -28,28m0,-58c-16.542,0 -30,13.458 -30,30c0,16.542 13.458,30 30,30c16.542,0 30,-13.458 30,-30c0,-16.542 -13.458,-30 -30,-30"/>
  </svg>
)
const ArtistProfileContainer = styled.div`
  background-color: #1d1d1d;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
`
export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  border-radius: ${props => props.circle ? "50%" : "0px"};
  align-items: center;
  justify-items: center;
  :hover {
    background-color: rgba(0,0,0,0.6)
  }
`

export const AlbumContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
`
const AlbumInfo = styled.div`
  box-sizing: border-box;
  padding-top: 10px;
  color: #fff;
`
export const TextOverflow = styled.div`
  width: 100%;
  -webkit-line-clamp: ${props => props.lineClamp || 1};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`
const Underline = styled.span`
  :hover {
    text-decoration: underline
  }
`
export const AlbumTag = props => {
  const [bool, setBool] = useState(false)
  return (
    <div style={{marginBottom: "20px"}}>
      <Link to={props.playlist ? "/playlist/"+props.albumId : "/album/"+props.albumId} >
        <TagImage size={200} imageMargin={"auto"} image={props.image}>
         <ImageContainer onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
            <PlayBtn visibility={bool} />
         </ImageContainer>
        </TagImage>
      </Link>
      <AlbumInfo>
        <Link style={{color: "white"}} to={props.playlist ? "/album/"+props.albumId : "/playlist/"+props.albumId} >
          <TextOverflow lineClamp={2}>
            <div style={{display: "inline"}}>
              <span>{props.name}</span>
            </div>
          </TextOverflow>
        </Link>
        <TextOverflow onClick={props.reload ? props.reload : null}>
          <div style={{display: "inline"}}>
            <span style={{opacity: "0.7"}}>{props.artistNames}</span>
          </div>
        </TextOverflow>
      </AlbumInfo>
    </div>
  )
}

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

const loadArtistProfileData = ({ api, id }) => {
  window.scroll(0, 0)
  const data = api.getArtistProfile(id, ["album"], "US", 10)
  return data
}

const  ArtistProfile = props => {
  const id = history.location.pathname.split("/").pop()
  const { data, error, isLoading } = useAsync({ 
    promiseFn: loadArtistProfileData,
    watch: id,
    api: props.spotifyAPI, id
  })
  
  return (
    <div style={{backgroundColor: "#1d1d1d", height: "100%"}}>
      {data && data.artist.images.length ? <ArtistHeader image={data.artist.images[0].url}>
          <div style={{
            background: "linear-gradient(120deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)",
            width: "100%",
            height: "100%",
          }}>
            <h1 style={{
              color: "#fff",
              margin: "0px",
              fontSize: "3.5em",
              fontWeight: "700",
              position: "absolute",
              right: "0px",
              boxSizing: "border-box"
            }}>{data.artist.name}</h1>
          </div>
        </ArtistHeader>
        : null}
      <ArtistProfileContainer>
        <Heading>Top Songs</Heading>
        <ol style={{margin: "0px 0px 20px 0px", padding: "0px", listStyle: "none"}}>
          {data ? data.artistTopTracks.tracks.map((track, index) => {
            if (index > 4) return null
            return (
              <SongTag
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
        <AlbumContainer>
          {data ? data.artistAlbums.items.map(album => {
            return (
              <AlbumTag
                image={album.images[0].url}
                name={album.name}
                artistNames={listArtistsNames(album.artists)}
                key={album.id}
                albumId={album.id}
              />
            )
          })
          : null}
        </AlbumContainer>
      </ArtistProfileContainer>
    </div>
  )
}

export default ArtistProfile