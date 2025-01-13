import { getLyrics } from 'genius-lyrics-api'

export default defineEventHandler(async event => {
  const { artist, title } = getQuery(event)
  console.log('Fetching lyrics for', artist, title)
  const config = useRuntimeConfig()
  const options = {
    apiKey: 'MHbt0sCYIeIZZRM8jwsSZ8CBrocX23fay9I7PnYswvU6uGx77QHgZNJPSjAfjZB2',
    title: title,
    artist: artist,
    optimizeQuery: true
  }
  try {
    const lyrics = await getLyrics(options)
    console.log(lyrics)
    return lyrics
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    throw error
  }
})
