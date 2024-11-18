<script setup>
const playlistId = ref('')
const router = useRouter()

function isValidPlaylistId (id) {
  const base62Regex = /^[0-9a-zA-Z]+$/
  return base62Regex.test(id)
}

function findSongs () {
  if (!isValidPlaylistId(playlistId.value)) {
    alert('Invalid playlist ID. Please enter a valid base62 ID.')
    return
  }
  console.log(playlistId.value)
  localStorage.setItem('playlistId', playlistId.value)
  router.push({
    name: 'songs'
  })
}
</script>
<template>
  <h1 class="title">Lyrics finder</h1>
  <p class="description">
    Find the lyrics of your favorites songs in your Spotify playlists !
  </p>
  <div class="input-area">
    <UInput
      class="input"
      placeholder="Playlist ID"
      v-model="playlistId"
      type="search"
      size="xl"
      icon="i-heroicons-magnifying-glass"
    ></UInput>
    <p class="infos">You need to enter the id of your Spotify playlist</p>
    <UButton class="find" @click="findSongs()" icon="i-heroicons-musical-note">
      Find songs
    </UButton>
  </div>
</template>
<style>
.title {
  font-size: 2.5em;
  padding-top: 10%;
  margin-top: 2%;
  text-align: center;
}

.description {
  font-size: 1.5em;
  margin-top: 2%;
  text-align: center;
}

.input-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10% 4% 4% 4%;
}

.input {
  width: 70%;
  margin-bottom: 2%;
}

.infos {
  margin-bottom: 2%;
}

.find {
  margin-top: 2%;
  height: 50px;
  width: 50%;
}
</style>
