import React from 'react'
import styled from 'styled-components'

const YourSpaceContainer = styled.div`
  background: white;
  hieght: 100%;
  width: 100%;
`

const YourSpace = props => {
  return (
    <YourSpaceContainer>
      Your Space
    </YourSpaceContainer>
  )
}

export default YourSpace