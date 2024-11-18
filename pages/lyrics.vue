<script setup>
const song = ref({
  title: '',
  artist: ''
})

const lyrics = ref('')

const loading = ref(false)
function fetchLyrics (song) {
  loading.value = true
  console.log(song)
  fetch(`/api/lyrics?title=${song.title}&artist=${song.artist}`)
    .then(res => res.text())
    .then(data => {
      console.log(data)
      lyrics.value = data
      loading.value = false
    })
    .catch(err => {
      console.error(err)
    })
}

onMounted(() => {
  const storedSong = JSON.parse(localStorage.getItem('song'))
  if (storedSong) {
    song.value.title = storedSong.title
    song.value.artist = storedSong.artist
    fetchLyrics(song.value)
  } else {
    console.error('No song found in localStorage')
  }
})
</script>
<template>
  <h1>Paroles</h1>
  <UCard class="header">
    <p>{{ song.artist }}</p>
    <p>{{ song.title }}</p>
  </UCard>
  <UCard class="card">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <pre>{{ lyrics }}</pre>
    </div>
  </UCard>
</template>
<style scoped>
h1 {
  font-size: 2.5em;
  margin-top: 2%;
  text-align: center;
}

.header {
  margin: 1% 5% 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header p {
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  margin: 1% 5% 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
