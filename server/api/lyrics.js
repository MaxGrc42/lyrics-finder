import { lyricsFinder } from 'lyrics-finder'

export default defineEventHandler(async event => {
  try {
    const { title, artist } = getQuery(event)
    console.log('Fetching lyrics for', title, artist)

    if (!title || !artist) {
      throw new Error('Title and artist are required')
    }

    const lyrics = await lyricsFinder(title, artist)
    console.log('Lyrics fetched successfully:', lyrics)

    return lyrics
  } catch (error) {
    console.error('Error fetching lyrics:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error.message
    })
  }
})
