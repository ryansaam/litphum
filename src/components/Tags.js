import React from 'react'

export const ArtistTag = props => {
  const handleClick = (name,genre) => event => {
    props.onClick(name,genre,event)
  }
  return (    
    <div id={props.id} className="artist-tag" onClick={props.canClick ? handleClick(props.artistName, props.genre): null}>
      <div className="artist-image-container">
        <div className="artist-img" style={{backgroundImage: `url(${props.img})`}} alt="Artist" />
      </div>
      <div className="artist-span-info-container">
        <span style={{fontSize: "20px", fontWeight: "700", opacity: "0.9"}} >{props.artistName}</span>
        <span style={{opacity: "0.6"}} >{props.genre}</span>
      </div>
    </div>
  )
}