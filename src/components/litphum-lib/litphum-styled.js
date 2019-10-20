import styled from 'styled-components'

export const TextOverflow = styled.div`
  color: ${props => props.alternate ? "white" : "inherit"};
  text-align: ${props => props.alternate ? "center" : "left"};
  opacity: ${props => props.alternate ? "0.7" : "1"};
  width: 100%;
  -webkit-line-clamp: ${props => props.lineClamp || 1};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
`
export const MediaListContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  justify-items: center;
`
export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  border-radius: ${props => props.circle ? "50%" : "0px"};
  align-items: center;
  justify-items: center;
  :hover {
    background-color: rgba(0,0,0,0.6)
  }
`
export const MediaItemImage = styled.div`
  background-image: url(${props => props.image});
  width: ${props => props.size ? props.size+"px" : "100%"};
  height: ${props => props.size ? props.size+"px" : "100%"};
  margin: ${props => props.imageMargin || "0px"};
  background-size: cover;
`
export const Header = styled.div`
  color: white;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin: 5px 0px;
`