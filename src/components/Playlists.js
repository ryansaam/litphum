import React from 'react'
import { useAsync } from 'react-async'
import { Albums } from './search/Search.js'
import MediaLoader from './litphum-lib/MediaLoader.js'
import LibraryHeader from './litphum-lib/LibraryHeader.js'

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

  return (
    <>
      { data
      ? <MediaLoader
          setBackground={"linear-gradient(120deg, rgb(223, 223, 223), rgb(0, 0, 0))"}
          spotifyAPI={props.spotifyAPI}
          defaultLoadURL={data.next}
          defaultItems={data.items}
          mediaType={"playlists"}
          header={<LibraryHeader>Your Playlists</LibraryHeader>}
        >
          { playlistItems => <Albums albums={playlistItems} playlist /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserPlaylists