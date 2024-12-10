<script setup>
const playlistId = ref('')
const router = useRouter()
const isOpen = ref(false)
const author = ref('')
const title = ref('')
const items = [
  {
    label: 'Playlist',
    icon: 'i-heroicons-queue-list'
  },
  {
    label: 'Titre et auteur',
    icon: 'i-heroicons-musical-note'
  }
]

const item = ref(0)
function onChange (index) {
  item.value = index
  console.log(item.value)
}

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

function findSong () {
  localStorage.setItem(
    'song',
    JSON.stringify({ title: title.value, artist: author.value })
  )
  router.push({
    name: 'lyrics'
  })
}
</script>
<template>
  <h1 class="title">Lyrics finder</h1>
  <p class="description">
    Trouve les paroles des chansons de ta playlist Spotify !
  </p>
  <div class="tabs">
    <UTabs :items="items" @change="onChange" />
  </div>
  <div class="input-area" v-if="item === 0">
    <UInput
      class="input"
      placeholder="Playlist ID"
      v-model="playlistId"
      type="search"
      size="xl"
      icon="i-heroicons-magnifying-glass"
    ></UInput>
    <p class="infos">Vous devez entrer l'ID de la playlist Spotify</p>
    <UButton
      color="gray"
      icon="i-heroicons-question-mark-circle"
      @click="isOpen = true"
    >
      Comment trouver l'ID de ma playlist ?
    </UButton>
    <UButton class="find" @click="findSongs()" icon="i-heroicons-musical-note">
      Trouver les chansons
    </UButton>
  </div>
  <div class="input-area" v-if="item === 1">
    <UInput
      class="input"
      placeholder="Titre de la chanson"
      v-model="title"
      type="search"
      size="xl"
      icon="i-heroicons-magnifying-glass"
    ></UInput>
    <UInput
      class="input"
      placeholder="Artiste de la chanson"
      v-model="author"
      type="search"
      size="xl"
      icon="i-heroicons-magnifying-glass"
    ></UInput>
    <UButton class="find" @click="findSong()" icon="i-heroicons-musical-note">
      Trouver la chanson
    </UButton>
  </div>
  <UModal v-model="isOpen" :ui="{ width: 'md:max-w-4xl' }">
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Comment trouver l'ID de ma playlist ?
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>
      <TutorialModal />
    </UCard>
  </UModal>
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

.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}

.input-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5% 4% 4% 4%;
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
  width: 20%;
}
</style>
