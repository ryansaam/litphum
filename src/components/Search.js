import React from 'react'
import styled from 'styled-components'
import icon from '../images/search-icon.svg'

const SearchContainer = styled.div`
  background: #4d4b4b;
  width: 100%;
  height: 100%
`
const SearchBox = styled.input`
  background: #2e2e2e;
  width: 100%;
  height: 57px;
  color: #fafafa;
  font-size: 24px;
  padding-left: 20px;
  border: none;
  outline: none;
  :before {
    content: url("../images/search-icon.svg")
  }
`

const searchIcon = (
  <svg height="50px" version="1.1" viewBox="0 0 50 50" width="50px" >
    <path clip-rule="evenodd" d="M306.39,154.09c19.628,4.543,35.244,21.259,39.787,39.523  c1.551,8.54,8.998,14.989,17.904,14.989c9.991,0,18.168-8.175,18.168-18.17c0-13.083-10.991-32.98-25.985-47.881  c-14.719-14.537-32.252-24.802-46.695-24.802c-9.991,0-18.172,8.45-18.172,18.446C291.396,145.094,297.847,152.546,306.39,154.09z   M56.629,392.312c-14.09,14.08-14.09,36.979,0,51.059c14.08,14.092,36.981,14.092,50.965,0l104.392-104.303  c24.347,15.181,53.062,23.991,83.953,23.991c87.857,0,158.995-71.142,158.995-158.999c0-87.854-71.138-158.995-158.995-158.995  c-87.856,0-158.995,71.141-158.995,158.995c0,30.802,8.819,59.606,23.992,83.953L56.629,392.312z M182.371,204.06  c0-62.687,50.875-113.568,113.568-113.568s113.569,50.881,113.569,113.568c0,62.694-50.876,113.569-113.569,113.569  S182.371,266.754,182.371,204.06z" fill="#010101" fill-rule="evenodd"/>
  </svg>
)

const Search = props => {
  return (

    <SearchContainer>
      <SearchBox placeholder="What are you looking for?" type="text" />
    </SearchContainer>
  )
}

export default Search