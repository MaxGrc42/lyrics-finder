<script setup>
import { onMounted, ref } from 'vue'

const loading = ref(false)

const songs = ref([])

const route = useRoute()

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
onMounted(() => {
  fetchSongs()
})
</script>
<template>
  <h1>Chansons dans la playlist</h1>
  <UCard class="card" title="Songs">
    <UTable :rows="songs" :columns="columns">
      <template #action-data="{ row }">
        <!-- Button in each row -->
        <UButton @click="getLyrics(row)">Paroles</UButton>
      </template>
    </UTable>
  </UCard>
</template>
<style scoped>
.card {
  margin: 1% 5% 0 5%;
}
h1 {
  font-size: 2.5em;
  margin-top: 2%;
  text-align: center;
}
.table {
  margin: 5%;
}
</style>
