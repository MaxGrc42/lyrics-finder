// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    geniusApiKey: process.env.GENIUS_API_KEY
  },
  nitro: {
    preset: 'vercel-edge',
    externals: {
      inline: ['formidable']
    }
  }
})
