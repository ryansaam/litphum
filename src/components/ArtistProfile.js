import React from 'react'
import styled from 'styled-components'

const ArtistProfileContainer = styled.div`
  background-color: pink;
  height: 100%;
  width: 100%;
`
const SongContainer = styled.div`
  background-color: #1d1d1d;
  width: 100%;
  height: 74px;
`
const SongImage = styled.div`
  background-image: url(${props => props.image});
  width: 70px;
  height: 70px;
  background-size: cover;
`
const PlayButtonContainer = styled.div`
  fill: #fff;
  stroke: none;
  float: left;
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
    </SongContainer>
  )
}

const  ArtistProfile = props => {
  return (
    <ArtistProfileContainer>
      { props.data.artistTopTracks
      ? <SongTag image={props.data.artistTopTracks.tracks[0].album.images[1].url}/>
      : null
      }
    </ArtistProfileContainer>
  )
}

export default ArtistProfile