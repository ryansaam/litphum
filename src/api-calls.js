import queryString from 'query-string'
const user_id = queryString.parse(window.location.search).access_token

export const getUserArtists = (limit, time_range) => {
  return (
    fetch(
      "https://api.spotify.com/v1/me/top/artists"+
      `${limit ? '?limit='+limit : ''}`+
      `${time_range ? '&time_range='+time_range : ''}`, {
      headers: {"Authorization": "Bearer " + user_id}
    })
    .then(response => response.json())
  )
}

export const testArtistData = {
  artist0: {
    artistName:"Kanye West",
    genre:"hip-hop"
  },
  artist1: {
    artistName:"The Weeknd",
    genre:"soul"
  },  
  artist2: {
    artistName:"Frank Ocean",
    genre:"soul"
  },
  artist3: {
    artistName:"Kurt Cobain",
    genre:"alternative"
  },  
  artist4: {
    artistName:"Deadmou5",
    genre:"EDM"
  },
  artist5: {
    artistName:"Prince",
    genre:"pop"
  },
  artist6: {
    artistName:"Chris Cornell",
    genre:"alternative"
  },
  artist7: { 
    artistName:"XXXTENTACION",
    genre:"hip-hop"
  }
}

export default user_id