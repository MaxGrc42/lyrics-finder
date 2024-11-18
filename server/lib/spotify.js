import SpotifyWebApi from 'spotify-web-api-node'
import { useRuntimeConfig } from '#imports'

let spotifyApi = null

export const getSpotifyApi = () => {
  if (!spotifyApi) {
    console.log('client secret', process.env.SPOTIFY_CLIENT_SECRET)
    const config = useRuntimeConfig()
    spotifyApi = new SpotifyWebApi({
      clientId: config.spotifyClientId,
      clientSecret: config.spotifyClientSecret
    })
  }
  return spotifyApi
}
