import React from 'react'

const NullResult = props => {
  return (
    <div style={{backgroundColor: `${props.bgColor}`, height: `${props.height ? props.height+"px" : "100%"}`, display: "grid", alignItems:"center", justifyItems:"center"}}>
      <h2 style={{color: "white", fontSize: `${props.size || 48}px`}}>{props.children || "no content"}</h2>
    </div>
  )
}

export default NullResult