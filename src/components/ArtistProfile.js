import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ArtistProfileContainer = styled.div`
  background-color: #1d1d1d;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
`
const SongContainer = styled.div`
  background-color: #1d1d1d;
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
const SongImage = styled.div`
  background-image: url(${props => props.image});
  width: 70px;
  height: 70px;
  margin-right: 15px;
  background-size: cover;
`
const PlayButtonContainer = styled.div`
  fill: #fff;
  stroke: none;
  padding: 0px 15px;
`

const PlayButton = () => (
  <svg width="25" height="25">
    <path id="svg_1" d="m22.554098,11.015841l-18.169627,-10.80275c-0.221899,-0.130389 -0.450325,-0.208623 -0.711383,-0.208623c-0.711383,0 -1.292236,0.586752 -1.292236,1.303893l-0.006526,0l0,22.426952l0.006526,0c0,0.717141 0.580854,1.303893 1.292236,1.303893c0.267584,0 0.489483,-0.091272 0.730962,-0.221662l18.150047,-10.789711c0.430745,-0.35857 0.704856,-0.899686 0.704856,-1.505996c0,-0.60631 -0.274111,-1.140906 -0.704856,-1.505996z"/>
  </svg>
)

const SongTag = props => {
  return (
    <SongContainer>
      <PlayButtonContainer>
        <PlayButton />
      </PlayButtonContainer>
      <SongImage image={props.image} />
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

function msToTime(s) {
  const pad = (n, z = 2) => ('00' + n).slice(-z);
  if (s >= 3600000) {
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0)
  } else {
    const minute = pad((s%3.6e6)/6e4 | 0).slice(0, 1) === '0' && pad((s%3.6e6)/6e4 | 0).slice(1)
    return (minute || pad((s%3.6e6)/6e4 | 0)) + ':' + pad((s%6e4)/1000|0)
  }
}

const  ArtistProfile = props => {
  const tracks = props.data.artistTopTracks && props.data.artistTopTracks.tracks
  const [songs, setSongs] = useState(null)

  useEffect(() => {
    if (tracks) {
      const trackTags = tracks.map((track, index) => {
        if (index > 4) return 
        return (
          <div key={track.id}>
            <SongTag
              image={track.album.images[1].url}
              duration={msToTime(track.duration_ms)}
              name={track.name}
              explicit={track.explicit}
            />
          </div>
        )
      })
      setSongs(trackTags)
    }
  }, [tracks])
  return (
    <ArtistProfileContainer>
      {songs}
    </ArtistProfileContainer>
  )
}

export default ArtistProfile