import React, { useRef } from 'react'
import styled from 'styled-components'

const SongContainer = styled.li`
  outline: none;
  width: 100%;
  height: 74px;
  display: grid;
  grid-template-columns: ${props => props.image ? "auto auto auto 1fr" : "auto auto 1fr"};
  align-items: center;
  :hover {
    svg {
      opacity: 0.7;
    }
    background-color: ${props => props.hoverColor ? props.hoverColor : null};
  }
  :focus {
    svg {
      opacity: 0.7;
    }
    background-color: ${props => props.hoverColor ? props.hoverColor : null};
  }
`
const PlayButtonContainer = styled.div`
  fill: #fff;
  stroke: none;
  padding: 0px 15px;
`
export const TagImage = styled.div`
  background-image: url(${props => props.image});
  width: ${props => props.size ? props.size+"px" : "100%"};
  height: ${props => props.size ? props.size+"px" : "100%"};
  margin: ${props => props.imageMargin || "0px"};
  background-size: cover;
`

const PlayButton = () => (
  <svg width="25" height="25">
    <path id="svg_1" d="m22.554098,11.015841l-18.169627,-10.80275c-0.221899,-0.130389 -0.450325,-0.208623 -0.711383,-0.208623c-0.711383,0 -1.292236,0.586752 -1.292236,1.303893l-0.006526,0l0,22.426952l0.006526,0c0,0.717141 0.580854,1.303893 1.292236,1.303893c0.267584,0 0.489483,-0.091272 0.730962,-0.221662l18.150047,-10.789711c0.430745,-0.35857 0.704856,-0.899686 0.704856,-1.505996c0,-0.60631 -0.274111,-1.140906 -0.704856,-1.505996z"/>
  </svg>
)

export function msToTime(s) {
  const pad = (n, z = 2) => ('00' + n).slice(-z);
  if (s >= 3600000) {
    return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0)
  } else {
    const minute = pad((s%3.6e6)/6e4 | 0).slice(0, 1) === '0' && pad((s%3.6e6)/6e4 | 0).slice(1)
    return (minute || pad((s%3.6e6)/6e4 | 0)) + ':' + pad((s%6e4)/1000|0)
  }
}

const SongTag = props => {
  const songRef = useRef(null)
  return (
    <SongContainer
      ref={songRef}
      role="button"
      onClick={() => songRef.current.focus()}
      tabIndex="-1"
      image={props.image}
      hoverColor={props.hoverColor}
    >
      <PlayButtonContainer>
        <PlayButton />
      </PlayButtonContainer>
      {props.image? <TagImage image={props.image} imageMargin={"0px 15px 0px 0px"} size={70} /> : null }
      <div>
      <span style={{display: "block", color: "white"}}>{props.name}</span>
      {props.explicit 
      ? <span style={{
          background: "white",
          opacity: "0.7",
          borderRadius: "2px",
          fontSize: "14px",
          padding: "3px",
          marginTop: "8px",
          display: "inline-block"
        }}>Explicit</span>
      : null }
      </div>
      <span style={{justifySelf: "end", margin: "0px 15px", color: "white"}}>{props.duration}</span>
    </SongContainer>
  )
}

export default SongTag