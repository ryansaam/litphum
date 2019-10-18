import React from 'react'

const LibraryHeader = props => {
  return (
    <h2 style={{padding: "20px", textAlign: "center", margin: "0px", color: "white"}}>{props.children}</h2>
  )
}

export default LibraryHeader