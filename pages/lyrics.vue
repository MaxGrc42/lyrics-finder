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
  fetch(`/api/genius?title=${song.title}&artist=${song.artist}`)
    .then(res => res.text())
    .then(data => {
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
  <div class="top">
    <BackButton />
    <div class="title">
      <h1>{{ song.artist }}</h1>
      <h1>-</h1>
      <h1>{{ song.title }}</h1>
    </div>
    <UButton class="export" @click="showModal = true"
      >Exporter la chanson</UButton
    >
  </div>
  <UCard class="card">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <pre class="lyrics">{{ lyrics }}</pre>
    </div>
  </UCard>
  <UModal v-model="showModal">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Export de la chanson
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="showModal = false"
          />
        </div>
      </template>
      <SongExport :lyrics="lyrics" :title="song.title" />
    </UCard>
  </UModal>
</template>
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
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

.top h1 {
  font-size: 2.5em;
  margin-left: 2vw;
  text-align: center;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin: 0 2vw 0 2vw;
}

.card {
  margin: 1% 5% 0 5%;
  display: flex;
  flex-direction: column; /* Ensure content stacks vertically */
  justify-content: flex-start; /* Align content to the top */
  align-items: center;
  width: 90%;
}
</style>
