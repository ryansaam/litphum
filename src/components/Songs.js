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
const loadUserTracks = ({ api, limmit }) => {
  const data = api.getUserTracks(limmit)
  return data
}


const Songs = props => {
  const [songs, setSongs] = useState([])
  const [loadSongURL, setLoadSongURL] = useState("")
  const scrollRef = useRef(null)

  /* init songs with users saved tracks */
  const { data } = useAsync({ 
    promiseFn: loadUserTracks,
    api: props.spotifyAPI
  })
  useEffect(() => {
    if (data) {
      setSongs(data.items)
      console.log(data)
    }
  }, [data])

  const { data: songData, run: runLoadSongs } = useAsync({
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })


  useEffect(() => {
    if (songData) { 
      console.log(`url: ${songData.next}`)
      console.log(songData)
      setLoadSongURL(songData.next)
      setSongs([...songs, ...songData.items])
    }
  }, [songData, songs])

  // dynamically loads albums when user scrolls to bottom
  const updateAlbums = _.throttle(() => {
    if (scrollRef.current.scrollTop === scrollRef.current.scrollHeight - scrollRef.current.offsetHeight)
      if (loadSongURL !== null) 
        runLoadSongs(loadSongURL || data.next)
  }, 1000)
  return (
    <SongsContainer>
      <SongContentWrapper ref={scrollRef} onScroll={updateAlbums}>
        {songs ? <Tracks songs={songs} /> : null}
      </SongContentWrapper>
    </SongsContainer>
  )
}

export default Songs