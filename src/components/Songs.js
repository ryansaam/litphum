import React from 'react'
import { useAsync } from 'react-async'
import SongTag, { msToTime } from './SongTag.js'
import MediaLoader from './litphum-lib/MediaLoader.js'

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

const UserSongs = props => {
  /* users tracks first request */
  const { data } = useAsync({ 
    promiseFn: loadUserTracks,
    api: props.spotifyAPI
  })
  console.log(data)

  return (
    <>
      { data
      ? <MediaLoader spotifyAPI={props.spotifyAPI} defaultLoadURL={data.next} defaultItems={data.items} mediaType={"tracks"} >
          { songItems => <Tracks songs={songItems} /> }
        </MediaLoader>
      : null }
    </>
  )
}

export default UserSongs