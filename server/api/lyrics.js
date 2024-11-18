import { getLyrics } from 'genius-lyrics-api'

export default defineEventHandler(async event => {
  const { artist, title } = getQuery(event)
  console.log('Fetching lyrics for', artist, title)
  const config = useRuntimeConfig()
  const options = {
    apiKey: config.geniusApiKey,
    title: title,
    artist: artist,
    optimizeQuery: true
  }
  try {
    const lyrics = await getLyrics(options)
    return lyrics
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    throw error
  }
})
