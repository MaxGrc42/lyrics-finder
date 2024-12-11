<script setup>
import { onMounted, ref } from 'vue'

const loading = ref(false)
const songs = ref([])
const title = ref('')
const image = ref('')

function fetchSongs () {
  let playlistId = localStorage.getItem('playlistId')
  loading.value = true
  fetch('/api/songs?id=' + playlistId)
    .then(res => res.json())
    .then(data => {
      console.log('data', data)
      title.value = data.name
      image.value = data.image
      for (const song of data.items) {
        songs.value.push(song)
      }
    })
}

onMounted(() => {
  fetchSongs()
})
</script>
<template>
  <div class="top">
    <BackButton />
    <img class="image" :src="image" alt="playlist image" />
    <h1>{{ title }}</h1>
  </div>
  <div class="songs" v-for="song in songs">
    <div class="song-container">
      <SongDisplay :title="song.title" :author="song.artist" />
    </div>
  </div>
</template>
<style scoped>
.image {
  margin: 2vw;
  width: 7%;
  border-radius: 10px;
}

.top {
  display: flex;
  justify-content: start;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: rgba(18, 18, 18, 0.8); /* Semi-transparent background */
  backdrop-filter: blur(10px); /* Apply blur effect */
  -webkit-backdrop-filter: blur(10px);
  margin-bottom: 2vh;
  height: 15vh;
}

.card {
  margin: 1% 5% 0 5%;
  overflow-y: auto;
  height: 85vh;
}

.top h1 {
  font-size: 2.5em;
  margin-left: 2vw;
  text-align: center;
}

.table {
  margin: 5%;
}

.song-container {
  margin: 0 1vh 1vh 1vh;
}
</style>
