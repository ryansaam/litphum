import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PlayBtn from './PlayBtn.js'
import { ImageContainer, TextOverflow } from './litphum-styled.js'

const ArtistResult = props => {
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
          <TextOverflow style={{opacity: "1"}} alternate lineClamp={2}>
            <div style={{display: "inline"}}>
              <span>{props.name}</span>
            </div>
          </TextOverflow>
        </div>
      </Link>
    </div>
  )
}

export default ArtistResult