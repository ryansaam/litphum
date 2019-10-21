import React, { useState } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { MediaItemImage, ImageContainer, TextOverflow } from './litphum-styled.js'
import PlayBtn from './PlayBtn.js'

const AlbumInfo = styled.div`
  box-sizing: border-box;
  padding-top: 10px;
  color: #fff;
`

const AlbumListItem = props => {
  const [visibleBool, setVisibleBool] = useState(false)
  return (
    <div style={{marginBottom: "20px"}}>
      <Link to={props.playlist ? "/playlist/"+props.albumId : "/album/"+props.albumId} >
        <MediaItemImage size={200} imageMargin={"auto"} image={props.image}>
         <ImageContainer onMouseEnter={() => setVisibleBool(true)} onMouseLeave={() => setVisibleBool(false)} >
            <PlayBtn visibility={visibleBool} />
         </ImageContainer>
        </MediaItemImage>
      </Link>
      <AlbumInfo>
        <Link style={{color: "white"}} to={props.playlist ? "/album/"+props.albumId : "/playlist/"+props.albumId} >
          <TextOverflow alternate lineClamp={2}>
            <div style={{display: "inline"}}>
              <span>{props.name}</span>
            </div>
          </TextOverflow>
        </Link>
        <TextOverflow alternate onClick={props.reload ? props.reload : null}>
          <div style={{display: "inline"}}>
            <span style={{opacity: "0.7"}}>{props.artistNames}</span>
          </div>
        </TextOverflow>
      </AlbumInfo>
    </div>
  )
}

export default AlbumListItem