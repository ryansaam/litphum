import React from 'react'
import { useAsync } from 'react-async'
import { Albums } from './search/Search.js'
import MediaLoader from './litphum-lib/MediaLoader.js'

// gets users tracks from SpotifyAPI
const loadUserPlaylists = ({ api, limmit }) => {
  const data = api.getUserPlaylists(limmit)
  return data
}

const UserPlaylists = props => {
  /* users tracks first request */
  const { data } = useAsync({ 
    promiseFn: loadUserPlaylists,
    api: props.spotifyAPI
  })
  console.log(data)

  return (
    <>
      { data
      ? <MediaLoader spotifyAPI={props.spotifyAPI} defaultLoadURL={data.next} defaultItems={data.items} mediaType={"playlists"} >
          { playlistItems => <Albums albums={playlistItems} /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserPlaylists