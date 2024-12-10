export async function getAccessToken (clientId, clientSecret) {
  const params = new URLSearchParams()
  params.append('client_id', clientId)
  params.append('client_secret', clientSecret)
  params.append('grant_type', 'client_credentials')
  params.append('redirect_uri', 'https://test.com/callback')

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })

  const { access_token } = await result.json()
  return access_token
}

export async function getPlaylistSongs (playlistId, accessToken) {
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
  const { items } = await result.json()
  return items.map(item => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists[0].name
  }))
}
