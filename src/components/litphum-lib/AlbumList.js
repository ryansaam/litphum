import React from 'react'
import { MediaListContainer } from './litphum-styled.js' 
import AlbumListItem from './AlbumListItem.js'
import nullImage from '../../images/album-img.svg'

const AlbumsList = props => { 
  return (
    <div>
      <MediaListContainer>
        { props.albums.map((album) => {
          return (
            <>
              { album.added_at // variation of SpotifyAPI data return 
              ? <AlbumListItem
                  image={album.album.images[0] ? album.album.images[0].url : nullImage}
                  name={album.album.name}
                  key={album.album.id}
                  albumId={album.album.id}
                  playlist={props.playlist}
                />
              : <AlbumListItem
                  image={album.images[0] ? album.images[0].url : nullImage}
                  name={album.name}
                  key={album.id}
                  albumId={album.id}
                  playlist={props.playlist}
                />}
              </>
          )
        }) }
      </MediaListContainer>
    </div>
  )
}

export default AlbumsList