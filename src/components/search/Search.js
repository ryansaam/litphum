import React, { useState } from 'react'
import { useAsync } from 'react-async'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import history from '../../history.js'
import ArtistResult from '../litphum-lib/ArtistResult.js'
import profileImg from '../../images/profile-img.png'
import TopResults from './TopResults.js'
import FilterBar from './FilterBar.js'
import MediaLoader from '../litphum-lib/MediaLoader.js'
import NullResult from '../litphum-lib/NullResult.js'
import AlbumsList from '../litphum-lib/AlbumList.js'
import { MediaListContainer } from '../litphum-lib/litphum-styled.js'
import SongListItem from '../litphum-lib/SongListItem.js'
import msToTime from '../litphum-lib/msToTime.js'

const SearchContainer = styled.div`
  background: #4d4b4b;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`
const SearchInput = styled.input`
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
const SearchLabel = styled.label`
  position: relative;
  width: 100%;
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

const Search = props => {
  const [query, setQuery] = useState(history.location.pathname.split('/').pop())
  const [activeFilter, setActiveFilter] = useState(history.location.pathname.split('/')[2])

  const { data: searchResultData } = useAsync({ 
    promiseFn: props.spotifyAPI.getSearchResults,
    watch: query,
    query,
    type: "album,artist,playlist,track"
  })
  
  // filters results, artists, songs, albums, playlists, etc.
  const handleFilter = location => () => {
    if (query) {
      switch (location) {
        case "results":
          history.push('/search/results/'+query)
          setActiveFilter("results")
          break
        case "artists":
          history.push('/search/artists/'+query)
          setActiveFilter("artists")
          break
        case "songs":
          history.push('/search/songs/'+query)
          setActiveFilter("songs")
          break
        case "albums":
          history.push('/search/albums/'+query)
          setActiveFilter("albums")
          break
        case "playlists":
          history.push('/search/playlists/'+query)
          setActiveFilter("playlists")
          break
        default:
          history.push('/search/')
          setActiveFilter("")
          break
      }
    }
  }
  
  /* Takes keyboard input from user and pushes it on the url query also sets filter back to results */ 
  const handleChange = event => {
    if (event.target.value) {
      setActiveFilter("results")
      history.push('/search/results/'+event.target.value)
    } else {
      history.push('/search/')
    }
    setQuery(event.target.value)
  }

  const filterBar = <FilterBar query={query} filterSelection={handleFilter} activeFilter={activeFilter} />

  return (
    <SearchContainer>
      <SearchLabel>
        <SearchInput onChange={handleChange} placeholder="Type a song, artist, album, playlist..." type="text" />
      </SearchLabel>
      { searchResultData && searchResultData.albums
      ? <>
          <Route path='/search/results/' component={() => <TopResults filter={filterBar} data={searchResultData} />} />

          <Route path='/search/artists/' component={() => (
            <MediaLoader
              spotifyAPI={props.spotifyAPI}
              filter={filterBar}
              defaultLoadURL={searchResultData.artists.next}
              defaultItems={searchResultData.artists.items}
              mediaType={"artists"}
              text={"no artists found"}
            >
              { artistItems => <Artists artists={artistItems} /> }
            </MediaLoader>
          )} />

          <Route path='/search/songs/' component={() => (
            <MediaLoader
              spotifyAPI={props.spotifyAPI}
              filter={filterBar}
              defaultLoadURL={searchResultData.tracks.next}
              defaultItems={searchResultData.tracks.items}
              mediaType={"tracks"}
              text={"no songs found"}
            >
              { songItems => <Tracks songs={songItems} /> }
            </MediaLoader>
          )} />

          <Route path='/search/albums/' component={() => (
            <MediaLoader
              spotifyAPI={props.spotifyAPI}
              filter={filterBar}
              defaultLoadURL={searchResultData.albums.next}
              defaultItems={searchResultData.albums.items}
              mediaType={"albums"}
              text={"no albums found"}
            >
              { albumItems => <AlbumsList albums={albumItems} /> }
            </MediaLoader>
          )} />

          <Route path='/search/playlists/' component={() => (
            <MediaLoader
              spotifyAPI={props.spotifyAPI}
              filter={filterBar}
              defaultLoadURL={searchResultData.playlists.next}
              defaultItems={searchResultData.playlists.items}
              mediaType={"playlists"} 
              text={"no playlists found"}
            >
              { playlistItems => <AlbumsList albums={playlistItems} playlist /> }
            </MediaLoader>
          )} />
        </>
      : <NullResult>no results</NullResult> }
    </SearchContainer>
  )
}

export const Artists = props => {
  return (
    <div>
      <MediaListContainer>
        { props.artists.map(artist => {
          return (
            <ArtistResult
              img={artist.images[0] ? artist.images[0].url : profileImg}
              name={artist.name}
              bgColor={artist.images[0] ? null : "rgba(0,0,0,0.6)"}
              key={artist.id}
              id={artist.id}
            />
          )
        }) }
      </MediaListContainer>
    </div>
  )
}

const Tracks = props => {
  return (
    <div>
      { props.songs.map((track) => {
          return (
            <SongListItem
              duration={msToTime(track.duration_ms)}
              key={track.id}
              name={track.name}
              explicit={track.explicit}
              hoverColor={"#101010"}
            />
          )
      }) }
    </div>
  )
}

export default Search