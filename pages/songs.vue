<script setup>
import { onMounted, ref } from 'vue'

const loading = ref(false)

const songs = ref([])

const router = useRouter()

const columns = ref([
  { label: 'Titre', key: 'title', sortable: true },
  { label: 'Artiste', key: 'artist', sortable: true },
  { label: 'Action', key: 'action' }
])

function fetchSongs () {
  let playlistId = localStorage.getItem('playlistId')
  loading.value = true
  fetch('/api/songs?id=' + playlistId)
    .then(res => res.json())
    .then(data => {
      for (const song of data) {
        songs.value.push(song)
      }
    })
}

function getLyrics (song) {
  localStorage.setItem('song', JSON.stringify(song))
  router.push({
    name: 'lyrics'
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
  fetchSongs()
})

onUnmounted(() => {
  enableScroll()
})
</script>
<template>
  <div class="top">
    <BackButton />
    <h1>Chansons</h1>
  </div>
  <UCard class="card" title="Songs">
    <UTable :rows="songs" :columns="columns">
      <template #action-data="{ row }">
        <!-- Button in each row -->
        <UButton @click="getLyrics(row)">Paroles</UButton>
      </template>
    </UTable>
  </UCard>
  <div class="songs" v-for="song in songs">
    <SongDisplay :title="song.title" :author="song.artist" />
  </div>
</template>
<style scoped>
.top {
  display: flex;
  justify-content: start;
  align-items: center;
}
.card {
  margin: 1% 5% 0 5%;
  overflow-y: auto;
  height: 85vh;
}
.top h1 {
  font-size: 2.5em;
  margin-top: 2%;
  margin-left: 2vw;
  text-align: center;
}
.table {
  margin: 5%;
}

@media (orientation: portrait) {
  .card {
    display: none;
  }
}
</style>
