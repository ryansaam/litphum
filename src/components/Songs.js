import React from 'react'
import { useAsync } from 'react-async'
import SongListItem from './litphum-lib/SongListItem.js'
import MediaLoader from './litphum-lib/MediaLoader.js'
import LibraryHeader from './litphum-lib/LibraryHeader.js'
import msToTime from './litphum-lib/msToTime.js'

const TrackList = props => {
  return (
    <div>
      { props.songs.map((trackItem) => {
          return (
            <SongListItem
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

const UserSongs = props => {
  const { data: usersReturnedTracks } = useAsync({ 
    promiseFn: props.spotifyAPI.getUserTracks
  })

  return (
    <>
      { usersReturnedTracks
      ? <MediaLoader 
          bgColor={"linear-gradient(120deg, rgb(223, 223, 223), rgb(8, 34, 105))"}
          spotifyAPI={props.spotifyAPI}
          defaultLoadURL={usersReturnedTracks.next} 
          defaultItems={usersReturnedTracks.items} 
          mediaType={"tracks"}
          text={"You don't have any songs"}
          header={<LibraryHeader>Your Songs</LibraryHeader>}
        >
          { songItems => <TrackList songs={songItems} /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserSongs