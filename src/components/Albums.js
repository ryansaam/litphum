import React from 'react'
import { useAsync } from 'react-async'
import { Albums } from './search/Search.js'
import MediaLoader from './litphum-lib/MediaLoader.js'

// gets users tracks from SpotifyAPI
const loadUserAlbums = ({ api, limmit }) => {
  const data = api.getUserAlbums(limmit)
  return data
}

const UserAlbums = props => {
  /* users tracks first request */
  const { data } = useAsync({ 
    promiseFn: loadUserAlbums,
    api: props.spotifyAPI
  })
  console.log(data)

  return (
    <>
      { data
      ? <MediaLoader spotifyAPI={props.spotifyAPI} defaultLoadURL={data.next} defaultItems={data.items} >
          { albumItems => <Albums albums={albumItems} /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserAlbums