import React from 'react'
import styled from 'styled-components'

const TrendingContainer = styled.div`
  background-color: #ce35fd;
  width: 100%;
  height: 100%;
  h1 {
    width: 100%;
    margin: 0px;
    text-align: center;
  }
`

const Trending = props => {
  return (
    <TrendingContainer>
      <h1>Top 100</h1>
    </TrendingContainer>
  )
}

export default Trending