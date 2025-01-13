import Genius from 'genius-lyrics'
const Client = new Genius.Client('top-secret-optional-key')

export default defineEventHandler(async event => {
  const { title, artist } = getQuery(event)
  console.log('Fetching lyrics for', title, artist)
  const Client = new Genius.Client()
  const request = ` ${title} ${artist}`
  const searches = await Client.songs.search(request)
  const firstSong = searches[0]
  const lyrics = await firstSong.lyrics()
  return lyrics
})
