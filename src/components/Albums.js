import React from 'react'
import { useAsync } from 'react-async'
import { Albums } from './search/Search.js'
import MediaLoader from './litphum-lib/MediaLoader.js'
import LibraryHeader from './litphum-lib/LibraryHeader.js'

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

  return (
    <>
      { data
      ? <MediaLoader 
          setBackground={"linear-gradient(120deg, rgb(223, 223, 223), rgb(170, 25, 25))"}
          spotifyAPI={props.spotifyAPI}
          defaultLoadURL={data.next}
          defaultItems={data.items}
          header={<LibraryHeader>Your Albums</LibraryHeader>}
        >
          { albumItems => <Albums albums={albumItems} /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserAlbums