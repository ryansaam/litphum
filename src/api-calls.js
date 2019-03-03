import queryString from 'query-string'
const user_token = queryString.parse(window.location.search).access_token

export function spotifyAPI(token) {
  this.user_token = token || sessionStorage.getItem('access_token')
  const controller = new AbortController()
  const signal = controller.signal
   
  const checkServerStat = (status, response) => {
    if (status === 401) {
      sessionStorage.removeItem("access_token")
      window.location = "http://localhost:3000"
    } else
      return response
  }

  this.getUserProfile = () => {
    return (
      fetch(
        "https://api.spotify.com/v1/me", {
        headers: {"Authorization": "Bearer " + this.user_token}
      }, {signal})
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }

  this.getUserArtists = (limit, time_range) => {
    return (
      fetch(
        "https://api.spotify.com/v1/me/top/artists"+
        ((limit || time_range)
        ? '?'+
          `${limit ? 'limit='+limit : ''}`+
          `${time_range ? '&time_range='+time_range : ''}`
        : ''), {
        headers: {"Authorization": "Bearer " + this.user_token}
      }, {signal})
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }

  this.getArtistProfile = (id,includeGroups,market,limit,offset,ac) => {
    return Promise.all([
      this.getArtist(id,ac),
      this.getArtistAlbums(id,includeGroups,market,limit,offset,ac),
      this.getArtistTopTracks(id,market,ac)
    ])
    .then(response => {
      return ({
        artist: response[0],
        artistAlbums: response[1],
        artistTopTracks: response[2]
      })
    })
  }
  this.getArtist = (id,ac) => {
    return (
      fetch(
        `https://api.spotify.com/v1/artists/${id}`, {
        headers: {"Authorization": "Bearer " + this.user_token}
      }, { signal: ac.signal })
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }
  this.getArtistAlbums = (id,includeGroups,market,limit,offset,ac) => {
    return (
      fetch(
        `https://api.spotify.com/v1/artists/${id}/albums`+
        ((includeGroups || market || limit || offset) 
        ? '?'+
          `${includeGroups ? 'inclued_groups='+includeGroups.toString() : ''}`+
          `${market ? '&market='+market : ''}`+
          `${limit ? '&limit='+limit : ''}`+
          `${offset ? '&offset='+offset : ''}`
        : ''), {
        headers: {"Authorization": "Bearer " + this.user_token}
      }, { signal: ac.signal })
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }
  this.getArtistTopTracks = (id,market,ac) => {
    return (
      fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks`+
        (market 
        ? '?'+
          `${market ? '&market='+market : ''}`
        : ''), {
        headers: {"Authorization": "Bearer " + this.user_token}
      }, { signal: ac.signal })
      .then(response => {
        return checkServerStat(response.status, response.json())
      })
    )
  }

  this.cancelRequest = () => controller.abort()
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