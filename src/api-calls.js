import queryString from 'query-string'
const user_token = queryString.parse(window.location.search).access_token

export function spotifyAPI(token) {
  this.user_token = token

  const checkServerStat = (status, response) => {
    if (status === 401)
      window.location = "http://localhost:3000"
    else
      return response
  }

  this.getUserProfile = () => {
    return (
      fetch(
        "https://api.spotify.com/v1/me", {
        headers: {"Authorization": "Bearer " + this.user_token}
      })
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }

  this.getUserArtists = (limit, time_range) => {
    return (
      fetch(
        "https://api.spotify.com/v1/me/top/artists"+
        `${limit ? '?limit='+limit : ''}`+
        `${time_range ? '&time_range='+time_range : ''}`, {
        headers: {"Authorization": "Bearer " + this.user_token}
      })
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }
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

export default user_token