import React, { useRef, useState } from 'react'
import { useAsync } from "react-async"
import { Link } from "react-router-dom"
import styled from 'styled-components'

const PlayBtn = props => (
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
const SongContainer = styled.li`
  background-color: #1d1d1d;
  outline: none;
  width: 100%;
  height: 74px;
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  align-items: center;
  :hover {
    svg {
      opacity: 0.7;
    }
    background-color: #181818;
  }
  :focus {
    svg {
      opacity: 0.7;
    }
    background-color: #181818;
  }
`
const TagImage = styled.div`
  background-image: url(${props => props.image});
  width: ${props => props.size ? props.size+"px" : "100%"};
  height: ${props => props.size ? props.size+"px" : "100%"};
  margin: ${props => props.imageMargin || "0px"};
  background-size: cover;
`
const PlayButtonContainer = styled.div`
  fill: #fff;
  stroke: none;
  padding: 0px 15px;
`
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  :hover {
    background-color: rgba(0,0,0,0.6)
  }
`

const PlayButton = () => (
  <svg width="25" height="25">
    <path id="svg_1" d="m22.554098,11.015841l-18.169627,-10.80275c-0.221899,-0.130389 -0.450325,-0.208623 -0.711383,-0.208623c-0.711383,0 -1.292236,0.586752 -1.292236,1.303893l-0.006526,0l0,22.426952l0.006526,0c0,0.717141 0.580854,1.303893 1.292236,1.303893c0.267584,0 0.489483,-0.091272 0.730962,-0.221662l18.150047,-10.789711c0.430745,-0.35857 0.704856,-0.899686 0.704856,-1.505996c0,-0.60631 -0.274111,-1.140906 -0.704856,-1.505996z"/>
  </svg>
)

const SongTag = props => {
  const songRef = useRef(null)
  return (
    <SongContainer
      ref={songRef}
      role="button"
      onClick={() => songRef.current.focus()}
      tabIndex="-1"
    >
      <PlayButtonContainer>
        <PlayButton />
      </PlayButtonContainer>
      <TagImage image={props.image} imageMargin={"0px 15px 0px 0px"} size={70} />
      <div>
      <span style={{display: "block", color: "white"}}>{props.name}</span>
      {props.explicit 
      ? <span style={{
          background: "white",
          opacity: "0.7",
          borderRadius: "2px",
          fontSize: "14px",
          padding: "3px",
          marginTop: "8px",
          display: "inline-block"
        }}>Explicit</span>
      : null }
      </div>
      <span style={{justifySelf: "end", margin: "0px 15px", color: "white"}}>{props.duration}</span>
    </SongContainer>
  )
}


const AlbumContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
`
const AlbumInfo = styled.div`
  box-sizing: border-box;
  padding: 10px 10px;
  color: #fff;
`
const TextOverflow = styled.div`
  width: 100%;
  -webkit-line-clamp: 2;
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
const AlbumTag = props => {
  const [bool, setBool] = useState(false)
  return (
    <div style={{marginBottom: "20px"}}>
      <Link to={"/album/"+props.albumId} >
        <TagImage size={200} imageMargin={"auto"} image={props.image}>
         <ImageContainer onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
            <PlayBtn visibility={bool} />
         </ImageContainer>
        </TagImage>
      </Link>
      <AlbumInfo>
        <Link style={{color: "white"}} to={"/album/"+props.albumId} >
          <TextOverflow>
            <div style={{display: "inline"}}>
              <span>{props.name}</span>
            </div>
          </TextOverflow>
        </Link>
        <Underline>
          <Link to={"/artist/"+props.artistId} style={{
            color: "white",
            opacity: "0.7",
            margin: "5px 0px",
            display: "block"
          }}>{props.artistName}</Link>
        </Underline>
      </AlbumInfo>
    </div>
  )
}

function msToTime(s) {
  const pad = (n, z = 2) => ('00' + n).slice(-z);
  if (s >= 3600000) {
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0)
  } else {
    const minute = pad((s%3.6e6)/6e4 | 0).slice(0, 1) === '0' && pad((s%3.6e6)/6e4 | 0).slice(1)
    return (minute || pad((s%3.6e6)/6e4 | 0)) + ':' + pad((s%6e4)/1000|0)
  }
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
  const data = api.getArtistProfile(id, ["album"], "US", 10)
  return data
}

const  ArtistProfile = props => {
  const id = window.location.pathname.split("/").pop()
  const { data, error, isLoading } = useAsync({ 
    promiseFn: loadArtistProfileData,
    api: props.spotifyAPI, id
  })
  
  return (
    <div>
      {data ? <ArtistHeader image={data.artist.images[0].url}>
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
                artistName={data.artist.name}
                artistId={id}
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