import React, { useState, useRef, useEffect } from 'react'
import { useAsync } from 'react-async'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import history from '../../history.js'
import SongTag, { msToTime } from '../SongTag.js'
import { AlbumTag, AlbumContainer } from '../ArtistProfile.js'
import { ArtistResult } from '../Tags.js'
import profileImg from '../../images/profile-img.png'
import _ from 'underscore'
import TopResults from './TopResults.js'
import FilterBar from './FilterBar.js'

const SearchContainer = styled.div`
  background: #4d4b4b;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
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
const ScrollContainer = styled.div`
  overflow: auto;
  position: relative;
  height: 100%;
`

const loadSearchResults = ({ api, query, market, limit, offset }) => {
  const data = api.getSearchResults(query, "album,artist,playlist,track")
  return data
}
const loadMoreItems = ( url , { api } ) => {
  const data = api.getMoreItems(url[0])
  return data
}

const Search = props => {
  const [query, setQuery] = useState(history.location.pathname.split('/').pop())
  const [activeFilter, setActiveFilter] = useState(history.location.pathname.split('/')[2])
  const [loadArtistURL, setLoadArtistURL] = useState("")
  const [loadSongURL, setLoadSongURL] = useState("")
  const [loadAlbumURL, setLoadAlbumURL] = useState("")
  const [loadPlaylistURL, setLoadPlaylistURL] = useState("")
  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])
  const [albums, setAlbums] = useState([])
  const [playlists, setPlaylists] = useState([])
  const scrollRef = useRef(null)
  const heightRef = useRef(null)

  const { data } = useAsync({ 
    promiseFn: loadSearchResults,
    watch: query,
    api: props.spotifyAPI,
    query
  })
  const { data: artistData, run: runLoadArtists } = useAsync({ 
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })
  const { data: songData, run: runLoadSongs } = useAsync({
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })
  const { data: albumData, run } = useAsync({ 
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })
  const { data: playlistData, run: runLoadPlaylists } = useAsync({ 
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })

  useEffect(() => {
    if (artistData) { 
      setLoadArtistURL(artistData.artists.next)
      setArtists([...artists, ...artistData.artists.items])
    }
  }, [artistData])
  useEffect(() => {
    if (songData) { 
      setLoadSongURL(songData.tracks.next)
      setSongs([...songs, ...songData.tracks.items])
    }
  }, [songData])
  useEffect(() => {
    if (albumData) { 
      setLoadAlbumURL(albumData.albums.next)
      setAlbums([...albums, ...albumData.albums.items])
    }
  }, [albumData])
  useEffect(() => {
    if (playlistData) { 
      setLoadPlaylistURL(playlistData.playlists.next)
      setPlaylists([...playlists, ...playlistData.playlists.items])
    }
  }, [playlistData])
  
  useEffect(() => {
    if (data && data.albums) {
      setAlbums(data.albums.items)
      setPlaylists(data.playlists.items)
      setArtists(data.artists.items)
      setSongs(data.tracks.items)
    }
  }, [data])
  
  const handleFilter = location => event => {
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

  const updateAlbums = _.throttle(() => {
    if (scrollRef.current.scrollTop === scrollRef.current.scrollHeight - scrollRef.current.offsetHeight) {
      switch (activeFilter) {
        case "artists":
          if (loadArtistURL !== null) runLoadArtists(loadArtistURL || data.artists.next)
          break
        case "songs":
          if (loadSongURL !== null) runLoadSongs(loadSongURL || data.tracks.next)
          break
        case "albums":
        if (loadAlbumURL !== null) run(loadAlbumURL || data.albums.next)
          break
        case "playlists":
        if (loadPlaylistURL !== null) runLoadPlaylists(loadPlaylistURL || data.playlists.next)
          break
      }
    }
  }, 1000)
  
  const handleChange = event => {
    if (event.target.value) {
      setActiveFilter("results")
      history.push('/search/results/'+event.target.value)
    } else {
      history.push('/search/')
    }
    setQuery(event.target.value)
  }
  
  return (
    <SearchContainer>
      <ScrollContainer ref={scrollRef} onScroll={updateAlbums}>
        <div ref={heightRef}>
          <Label>
            <SearchBox onChange={handleChange} placeholder="Type a song, artist, album, playlist..." type="text" />
          </Label>
          {data && data.albums
          ? <>
              <FilterBar query={query} filterSelection={handleFilter} activeFilter={activeFilter} />
              <Route path='/search/results/' component={() => <TopResults data={data} />} />
              <Route path='/search/artists/' component={() => <Artists artists={artists} />} />
              <Route path='/search/songs/' component={() => <Songs songs={songs} />} />
              <Route path='/search/albums/' component={() => <Albums albums={albums} />} />
              <Route path='/search/playlists/' component={() => <Albums albums={playlists} />} />
            </>
          : null }
        </div>
      </ScrollContainer>
    </SearchContainer>
  )
}

const Artists = props => {
  return (
    <div>
      <AlbumContainer>
        { props.artists.map((artist) => {
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
      </AlbumContainer>
    </div>
  )
}

const Songs = props => {
  return (
    <div>
      { props.songs.map((track) => {
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
  )
}

const Albums = props => {
  return (
    <div>
      <AlbumContainer>
        { props.albums.map((album) => {
          return (
            <AlbumTag
              image={album.images[0].url}
              name={album.name}
              key={album.id}
              albumId={album.id}
              playlist
            />
          )
        }) }
      </AlbumContainer>
    </div>
  )
}

export default Search