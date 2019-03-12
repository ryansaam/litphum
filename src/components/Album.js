import React, { useState } from 'react'
import styled from 'styled-components'
import { useAsync } from "react-async"

const AlbumView = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const AlbumDetails = styled.div`
  background-color: #101010;
  height: 100%;
`
const AlbumSongContainer = styled.div`
  background-color: #010101;
  height: 100%;
`
const TagImage = styled.div`
  background-image: url(${props => props.image});
  width: ${props => props.size ? props.size+"px" : "100%"};
  height: ${props => props.size ? props.size+"px" : "100%"};
  margin: ${props => props.imageMargin || "0px"};
  background-size: cover;
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
const PlayBtn = props => (
  <svg style={{visibility: props.visibility ? "visible" : "hidden" }} fill="white" width="60" height="60" xmlns="http://www.w3.org/2000/svg">
    <path id="control-play" d="m40,30c0,0.34 -0.173,0.657 -0.459,0.841l-10.01,6.435c-0.466,0.298 -1.083,0.164 -1.382,-0.299c-0.298,-0.465 -0.164,-1.083 0.3,-1.382l8.702,-5.595l-11.151,-7.168l0,16.168c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1l0,-18c0,-0.366 0.2,-0.702 0.521,-0.878c0.32,-0.175 0.711,-0.163 1.02,0.037l14,9c0.286,0.184 0.459,0.501 0.459,0.841m-10,28c-15.439,0 -28,-12.561 -28,-28c0,-15.439 12.561,-28 28,-28c15.439,0 28,12.561 28,28c0,15.439 -12.561,28 -28,28m0,-58c-16.542,0 -30,13.458 -30,30c0,16.542 13.458,30 30,30c16.542,0 30,-13.458 30,-30c0,-16.542 -13.458,-30 -30,-30"/>
  </svg>
)

const loadAlbumData = ({ api, id }) => {
  const data = api.getAlbum(id, "US")
  return data
}

const Album = props => {
  const [bool, setBool] = useState(false)
  const id = window.location.pathname.split("/").pop()
  const { data, error, isLoading } = useAsync({ 
    promiseFn: loadAlbumData,
    watch: false,
    api: props.spotifyAPI, id
  })
  console.log(data)
  return (
    <AlbumView>
      {data ? 
      <>
        <AlbumDetails>
          <TagImage imageMargin={"auto"} image={data.images[0].url}>
            <ImageContainer onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
              <PlayBtn visibility={bool} />
            </ImageContainer>
          </TagImage>
        </AlbumDetails>
        <AlbumSongContainer>

        </AlbumSongContainer>
      </>
      : null }
    </AlbumView>
  )
}

export default Album