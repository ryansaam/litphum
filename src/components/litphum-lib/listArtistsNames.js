import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const Underline = styled.span`
  :hover {
    text-decoration: underline
  }
`

const listArtistsNames = (arr) => {
  if (arr.length === 1) return <Underline><Link to={"/artist/"+arr[0].id}>{arr[0].name}</Link></Underline>
  return arr.map((artist, index) => {
    if (index === 0) return <Underline key={artist.id}><Link to={"/artist/"+artist.id}>{artist.name}</Link></Underline>
    return <span key={artist.id}>, <Underline><Link to={"/artist/"+artist.id}>{artist.name}</Link></Underline></span>
  });
}

export default listArtistsNames