import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const FilterBarList = styled.ul`
  margin: 30px 0px;
  padding: 0px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(5, 120px);
  li {
    color: rgba(255,255,255,0.8);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: color linear 150ms;
    :hover {
      color: rgba(255,255,255,1)
    } 
  }
`
const SelectedUnderline = styled.span`
  background-color: #2ad4ff;
  width: 30px;
  height: 2px;
  margin: 5px auto 0px auto;
  visibility: ${props => props.selected || "hidden"};
  display: block;
`

const FilterLink = props => {
  return (
    <Link to={`/search/${props.page}/${props.query}`} onClick={props.filterSelection(props.page)} >
      <li>{props.children}</li>
      <SelectedUnderline selected={props.activeFilter === props.page ? true : false} />
    </Link>
  )
}

const FilterBar = props => {
  return (
    <div style={{display: "grid", justifyItems: "center"}} >
      <FilterBarList>
        <FilterLink
          query={props.query}
          page={'results'}
          filterSelection={props.filterSelection}
          activeFilter={props.activeFilter}
        >Top Results</FilterLink>
        <FilterLink
          query={props.query}
          page={'artists'}
          filterSelection={props.filterSelection}
          activeFilter={props.activeFilter}
        >Artists</FilterLink>
        <FilterLink
          query={props.query}
          page={'songs'}
          filterSelection={props.filterSelection}
          activeFilter={props.activeFilter}
        >Songs</FilterLink>
        <FilterLink
          query={props.query}
          page={'albums'}
          filterSelection={props.filterSelection}
          activeFilter={props.activeFilter}
        >Albums</FilterLink>
        <FilterLink
          query={props.query}
          page={'playlists'}
          filterSelection={props.filterSelection}
          activeFilter={props.activeFilter}
        >Playlists</FilterLink>
      </FilterBarList>
    </div>
  )
}

export default FilterBar