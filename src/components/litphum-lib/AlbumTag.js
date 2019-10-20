import React, { useState } from 'react'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import { TagImage, ImageContainer, TextOverflow } from './litphum-styled.js'
import PlayBtn from './PlayBtn.js'

const AlbumInfo = styled.div`
  box-sizing: border-box;
  padding-top: 10px;
  color: #fff;
`

const AlbumTag = props => {
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

export default AlbumTag