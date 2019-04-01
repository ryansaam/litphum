import React from 'react'
import styled from 'styled-components'
import yourSpaceBG from '../images/your-space-bg.jpg'

const YourSpaceContainer = styled.div`
  background: url(${yourSpaceBG});
  background-size: cover;
  background-position: bottom;
  height: 100%;
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