import { getSpotifyApi } from '../lib/spotify'
export default defineEventHandler(async event => {
  const spotifyApi = getSpotifyApi()
  const playlistId = getQuery(event).id
  console.log('Fetching songs for playlist', playlistId)
  try {
    const data = await spotifyApi.clientCredentialsGrant()
    console.log('The access token expires in ' + data.body['expires_in'])
    console.log('The access token is ' + data.body['access_token'])
    spotifyApi.setAccessToken(data.body['access_token'])

    const playlistData = await spotifyApi.getPlaylist(playlistId)
    const songs = playlistData.body.tracks.items.map(item => ({
      title: item.track.name,
      artist: item.track.artists[0].name
    }))
    return songs
  } catch (error) {
    console.error('Error fetching songs:', error)
    throw error
  }
})
