<script setup>
const song = ref({
  title: '',
  artist: ''
})
const lyrics = ref('')
const showModal = ref(false)
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

function disableScroll () {
  document.body.style.overflow = 'hidden'
}

function enableScroll () {
  document.body.style.overflow = ''
}

onMounted(() => {
  disableScroll()
  const storedSong = JSON.parse(localStorage.getItem('song'))
  if (storedSong) {
    song.value.title = storedSong.title
    song.value.artist = storedSong.artist
    fetchLyrics(song.value)
  } else {
    console.error('No song found in localStorage')
  }
})

onUnmounted(() => {
  enableScroll()
})
</script>
<template>
  <div class="top">
    <BackButton />
    <h1>Paroles</h1>
  </div>
  <UCard class="header">
    <p>{{ song.artist }}</p>
    <p>-</p>
    <p>{{ song.title }}</p>
    <UButton class="export" @click="showModal = true"
      >Exporter la chanson</UButton
    >
  </UCard>
  <UCard class="card">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <pre class="lyrics">{{ lyrics }}</pre>
    </div>
  </UCard>
  <UModal v-model="showModal">
    <SongExport :lyrics="lyrics" :title="song.title" />
  </UModal>
</template>
<style scoped>
.top {
  display: flex;
  justify-content: start;
  align-items: center;
}
.top h1 {
  font-size: 2.5em;
  margin-top: 2%;
  margin-left: 2vw;
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
  margin-right: auto;
  display: inline;
  justify-content: center;
  align-items: center;
}

.lyrics {
  white-space: pre-wrap;
  font-size: 1em;
}

.export {
  margin-left: 2vw;
}

.card {
  margin: 1% 5% 0 5%;
  display: flex;
  flex-direction: column; /* Ensure content stacks vertically */
  justify-content: flex-start; /* Align content to the top */
  align-items: center;
  max-height: 600px; /* Adjust the height as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  width: 90%;
}
</style>
