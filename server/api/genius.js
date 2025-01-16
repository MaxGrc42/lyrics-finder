import Genius from 'genius-lyrics'

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const geniusApiKey = config.geniusApiKey
  try {
    const { title, artist } = getQuery(event)
    console.log('Fetching lyrics for', title, artist)

    if (!title || !artist) {
      throw new Error('Title and artist are required')
    }
    console.log('Genius API key:', geniusApiKey)
    const Client = new Genius.Client(config.geniusApiKey)
    const request = `${title} ${artist}`
    const searches = await Client.songs.search(request)

    if (!searches || searches.length === 0) {
      throw new Error('No songs found')
    }

    const firstSong = searches[0]
    const lyrics = await firstSong.lyrics()

    return lyrics
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'api key:' + geniusApiKey + error.message
    })
  }
})
