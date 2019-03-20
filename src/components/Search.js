import React, { useState } from 'react'
import { useAsync } from 'react-async'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import history from '../history.js'
import SongTag, { msToTime } from './SongTag.js'
import { TagImage, PlayBtn, ImageContainer, Header, TextOverflow, listArtistsNames } from './Album.js'
import { AlbumTag, AlbumContainer } from './ArtistProfile.js'

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
  padding-left: 60px;
  border: none;
  outline: none;
  box-sizing: border-box;
  &::-webkit-input-placeholder {
    color: #999999;
  }
`
const Label = styled.label`
  position: relative;
  width: 100%
  :before {
    content: "";
    position: absolute;
    left: 10px;
    top: -13px;
    width: 35px;
    height: 35px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' fill='#999999' height='500' viewBox='0 0 500 500' fill-rule='evenodd'%3E%3Cpath d='M497.913,497.913c-18.782,18.782-49.225,18.782-68.008,0l-84.862-84.863c-34.889,22.382-76.13,35.717-120.659,35.717  C100.469,448.767,0,348.312,0,224.383S100.469,0,224.384,0c123.931,0,224.384,100.452,224.384,224.383  c0,44.514-13.352,85.771-35.718,120.676l84.863,84.863C516.695,448.704,516.695,479.131,497.913,497.913z M224.384,64.109  c-88.511,0-160.274,71.747-160.274,160.273c0,88.526,71.764,160.274,160.274,160.274c88.525,0,160.273-71.748,160.273-160.274  C384.657,135.856,312.909,64.109,224.384,64.109z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 35px 35px;
    background-repeat: no-repeat;
    border-radius: 0px 0px 5px 0px;
  }
`

const loadSearchResults = ({ api, query, market, limit, offset }) => {
  const data = api.getSearchResults(query, "album,artist,playlist,track")
  return data
}

const Search = props => {
  const [query, setQuery] = useState(history.location.pathname.split('/').pop())
  
  const { data, error, isLoading } = useAsync({ 
    promiseFn: loadSearchResults,
    watch: query,
    api: props.spotifyAPI,
    query
  })

  const handleChange = event => {
    if (event.target.value)
      history.push('/search/results/'+event.target.value)
    else
      history.push('/search/')
    setQuery(event.target.value)
  }
  console.log(data)
  return (
    <SearchContainer>
      <Label>
        <SearchBox onChange={handleChange} placeholder="What are you looking for?" type="text" />
      </Label>
      {data && data.albums
      ? <>
          <Route path='/search/results/' component={() => <TopResults data={data} />} />
        </>
      : null }
    </SearchContainer>
  )
}
const TopResultsContainer = styled.div`
  padding: 20px;
`
const SongResults = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`

const TopResults = props => {
  const [bool, setBool] = useState(false)
  const artistsNames = props.data.tracks.total ? listArtistsNames(props.data.tracks.items[0].artists) : null
  
  return (
    <TopResultsContainer>
      { props.data.tracks.total
      ? <SongResults>
          <div style={{marginRight: "20px"}}>
          <TagImage imageMargin={"auto"} size={"300px"} image={props.data.tracks.items[0].album.images[0].url}>
            <ImageContainer onMouseEnter={() => setBool(true)} onMouseLeave={() => setBool(false)} >
              <PlayBtn visibility={bool} />
            </ImageContainer>
          </TagImage>
          <div style={{maxWidth: "300px", margin: "auto"}}>
            <Header>{props.data.tracks.items[0].name}</Header>
            <TextOverflow>
              <div style={{display: "inline"}}>
                <span>{artistsNames}</span>
              </div>
            </TextOverflow>
          </div>
          </div>
          <div>
            { props.data.tracks.items.map((track, index) => {
                if (index > 4) return null
                return (
                  <SongTag
                    duration={msToTime(track.duration_ms)}
                    key={track.id}
                    name={track.name}
                    explicit={track.explicit}
                    hoverColor={"#101010"}
                  />
                )
            }) }
          </div>
        </SongResults>
      : null}
      <AlbumContainer>
        { props.data.albums.items.map((album, index) => {
          if (index > 9) return null
          return (
            <AlbumTag
              image={album.images[0].url}
              name={album.name}
              artistNames={listArtistsNames(album.artists)}
              key={album.id}
              albumId={album.id}
            />
          )
        }) }
      </AlbumContainer>
      <AlbumContainer>
        { props.data.playlists.items.map((playlist, index) => {
          if (index > 9) return null
          return (
            <AlbumTag
              image={playlist.images[0].url}
              name={playlist.name}
              key={playlist.id}
              albumId={playlist.id}
              playlist
            />
          )
        }) }
      </AlbumContainer>
      <div>
      </div>
    </TopResultsContainer>
  )
}

export default Search