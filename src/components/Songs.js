import React, { useState, useRef, useEffect } from 'react'
import { useAsync } from 'react-async'
import styled from 'styled-components'
import _ from 'underscore'
import SongTag, { msToTime } from './SongTag.js'
import { loadMoreItems } from './search/Search.js'

const SongsContainer = styled.div`
  background: linear-gradient(120deg, rgb(223, 223, 223), rgb(8, 34, 105));
  height: 100%;
  width: 100%;
  position: relative;
`
const SongContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
`

const Tracks = props => {
  return (
    <div>
      { props.songs.map((trackItem) => {
          return (
            <SongTag
              image={trackItem.track.album.images[1].url}
              duration={msToTime(trackItem.track.duration_ms)}
              key={trackItem.track.id}
              name={trackItem.track.name}
              explicit={trackItem.track.explicit}
              hoverColor={"rgba(255, 255, 255, 0.4)"}
            />
          )
      }) }
    </div>
  )
}

// gets users tracks from SpotifyAPI
const loadUserTracks = ({ api, limmit }) => {
  const data = api.getUserTracks(limmit)
  return data
}

// React prevState example hook
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const Songs = props => {
  const [songs, setSongs] = useState([])
  const [loadSongURL, setLoadSongURL] = useState("")
  const prevURL = usePrevious(loadSongURL);
  const scrollRef = useRef(null)
  const scrollPadding = 300

  /* users tracks first request */
  const { data } = useAsync({ 
    promiseFn: loadUserTracks,
    api: props.spotifyAPI
  })

  // requests more tracks if user scrolls to bottom
  const { data: songData, run: runLoadSongs } = useAsync({
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })

  /* init songs with users saved tracks and points URL query string to next list */
  useEffect(() => {
    if (data) {
      setSongs(data.items)
      setLoadSongURL(data.next)
    }
  }, [data])

  // updates songs arr and api URL querry string
  useEffect(() => {
    if (songData) {
      setLoadSongURL(songData.next)
      setSongs(prevSongs => [...prevSongs, ...songData.items])
    }
  }, [songData])

  // dynamically loads songs when user scrolls to bottom
  const updateAlbums = _.throttle(() => {
    if (scrollRef.current.scrollTop >= (scrollRef.current.scrollHeight - scrollRef.current.offsetHeight) - scrollPadding) {
      if (!(prevURL === loadSongURL)) { // prevents loading same content twice and throwing duplicate key err
        runLoadSongs(loadSongURL)
        console.log(songData)
      }
    }
  }, 300) // ms

  return (
    <SongsContainer>
      <SongContentWrapper ref={scrollRef} onScroll={updateAlbums}>
        {songs ? <Tracks songs={songs} /> : null}
      </SongContentWrapper>
    </SongsContainer>
  )
}

export default Songs