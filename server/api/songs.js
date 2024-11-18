import { getAccessToken, getPlaylistSongs } from '../lib/spotify-own'

export default defineEventHandler(async event => {
  const playlistId = getQuery(event).id
  const config = useRuntimeConfig()
  const clientId = config.spotifyClientId
  const clientSecret = config.spotifyClientSecret
  console.log('client id', clientId)
  console.log('client secret', clientSecret)
  const token = await getAccessToken(clientId, clientSecret)
  console.log(token)
  const songs = await getPlaylistSongs(playlistId, token)
  return songs
})
