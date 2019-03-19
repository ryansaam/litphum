import React, { useState } from 'react'
import styled from 'styled-components'
import history from '../history.js'
import { useAsync } from "react-async"
import { Link } from "react-router-dom"
import SongTag, { msToTime } from './SongTag.js'

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
export const TagImage = styled.div`
  background-image: url(${props => props.image});
  width: ${props => props.size ? props.size : "100%"};
  height: ${props => props.size ? props.size : "100%"};
  margin: ${props => props.imageMargin || "0px"};
  background-size: cover;
`
export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  :hover {
    background-color: rgba(0,0,0,0.6)
  }
`
export const Header = styled.div`
  color: white;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin: 5px 0px;
`
export const TextOverflow = styled.div`
  color: white;
  text-align: center;
  opacity: 0.7;
  width: 100%;
  -webkit-line-clamp: 1;
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
export const PlayBtn = props => (
  <svg style={{visibility: props.visibility ? "visible" : "hidden" }} fill="white" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
    <path id="control-play" d="m40,30c0,0.34 -0.173,0.657 -0.459,0.841l-10.01,6.435c-0.466,0.298 -1.083,0.164 -1.382,-0.299c-0.298,-0.465 -0.164,-1.083 0.3,-1.382l8.702,-5.595l-11.151,-7.168l0,16.168c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1l0,-18c0,-0.366 0.2,-0.702 0.521,-0.878c0.32,-0.175 0.711,-0.163 1.02,0.037l14,9c0.286,0.184 0.459,0.501 0.459,0.841m-10,28c-15.439,0 -28,-12.561 -28,-28c0,-15.439 12.561,-28 28,-28c15.439,0 28,12.561 28,28c0,15.439 -12.561,28 -28,28m0,-58c-16.542,0 -30,13.458 -30,30c0,16.542 13.458,30 30,30c16.542,0 30,-13.458 30,-30c0,-16.542 -13.458,-30 -30,-30"/>
  </svg>
)

const loadAlbumData = ({ api, id }) => {
  const data = api.getAlbum(id, "US")
  return data
}
export const listArtistsNames = (arr) => {
  if (arr.length === 1) return <Underline><Link to={"/artist/"+arr[0].id}>{arr[0].name}</Link></Underline>
  return arr.map((artist, index) => {
    if (index === 0) return <Underline key={artist.id}><Link to={"/artist/"+artist.id}>{artist.name}</Link></Underline>
    return <span key={artist.id}>, <Underline><Link to={"/artist/"+artist.id}>{artist.name}</Link></Underline></span>
  });
}

const Album = props => {
  const [bool, setBool] = useState(false)
  const id = history.location.pathname.split("/").pop()
  const { data, error, isLoading } = useAsync({ 
    promiseFn: loadAlbumData,
    watch: id,
    api: props.spotifyAPI, id
  })
  const artistsNames = data ? listArtistsNames(data.artists) : null
  console.log(data)
  return (
    <AlbumView>
      {data ? 
      <>
        <AlbumDetails>
          <TagImage imageMargin={"auto"} size={"300px"} image={data.images[0].url}>
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
          <Info>{data.release_date.split('-')[0]} - {data.total_tracks} SONGS</Info>
        </AlbumDetails>
        <AlbumSongContainer>
          { data.tracks.items.map((track, index) => {
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
          { data.copyrights.map(object => {
            return (
              <CopyRight>{object.text}</CopyRight>
            )
          }) }
        </AlbumSongContainer>
      </>
      : null }
    </AlbumView>
  )
}

export default Album