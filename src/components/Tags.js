import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TextOverflow, ImageContainer, PlayBtn } from './ArtistProfile.js'

export const Header = styled.div`
  color: white;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin: 5px 0px;
`

export const ArtistResult = props => {
  const [bool,setBool] = useState(false)
  return (
    <div>
      <Link style={{color: "white"}} to={"/artist/"+props.id} >
        <div style={{
          backgroundImage: `url(${props.img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "50%",
          height: "200px",
          width: "200px",
          marginBottom: "10px"}}
        >
          <ImageContainer style={{backgroundColor: props.bgColor}} circle onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
            <PlayBtn visibility={bool} />
          </ImageContainer>
        </div>
        <div style={{marginBottom: "20px"}}>
          <TextOverflow lineClamp={2}>
            <div style={{display: "inline"}}>
              <span>{props.name}</span>
            </div>
          </TextOverflow>
        </div>
      </Link>
    </div>
  )
}