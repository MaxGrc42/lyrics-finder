<script setup>
const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

function getLyrics (title, author) {
  const song = {
    title: title,
    artist: author
  }
  localStorage.setItem('song', JSON.stringify(song))
  router.push({
    name: 'lyrics'
  })
}
</script>
<template>
  <UCard class="card-select">
    <div class="infos">
      <p class="song-title">{{ title }}</p>
      <p>{{ author }}</p>
    </div>
    <div class="action">
      <UButton @click="getLyrics(title, author)">Voir les paroles</UButton>
    </div>
  </UCard>
</template>
<style scoped>
.card-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2vw 2vh 2vw;
}
.infos {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
}
.actions {
  width: 100%;
}
.song-title {
  font-weight: bold;
}
</style>
