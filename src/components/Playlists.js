import React from 'react'
import { useAsync } from 'react-async'
import AlbumsList from './litphum-lib/AlbumList.js'
import MediaLoader from './litphum-lib/MediaLoader.js'
import LibraryHeader from './litphum-lib/LibraryHeader.js'

const UserPlaylists = props => {
  const { data: usersReturnedPlaylists } = useAsync({ 
    promiseFn: props.spotifyAPI.getUserPlaylists,
  })

  return (
    <>
      { usersReturnedPlaylists
      ? <MediaLoader
          bgColor={"linear-gradient(120deg, rgb(223, 223, 223), rgb(0, 0, 0))"}
          spotifyAPI={props.spotifyAPI}
          defaultLoadURL={usersReturnedPlaylists.next}
          defaultItems={usersReturnedPlaylists.items}
          mediaType={"playlists"}
          header={<LibraryHeader>Your Playlists</LibraryHeader>}
        >
          { playlistItems => <AlbumsList albums={playlistItems} playlist /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserPlaylists