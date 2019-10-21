import React from 'react'
import { useAsync } from 'react-async'
import AlbumsList from './litphum-lib/AlbumList.js'
import MediaLoader from './litphum-lib/MediaLoader.js'
import LibraryHeader from './litphum-lib/LibraryHeader.js'

const UserAlbums = props => {
  const { data: usersReturnedAlbums } = useAsync({ 
    promiseFn: props.spotifyAPI.getUserAlbums,
  })

  return (
    <>
      { usersReturnedAlbums
      ? <MediaLoader 
          bgColor={"linear-gradient(120deg, rgb(223, 223, 223), rgb(170, 25, 25))"}
          spotifyAPI={props.spotifyAPI}
          defaultLoadURL={usersReturnedAlbums.next}
          defaultItems={usersReturnedAlbums.items}
          header={<LibraryHeader>Your Albums</LibraryHeader>}
        >
          { albumItems => <AlbumsList albums={albumItems} /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserAlbums