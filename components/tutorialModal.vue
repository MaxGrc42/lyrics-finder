<script setup>
const pictures = ['/step1.png', '/step2.png', '/step3.png']
const texts = ref([
  "Dans l'écran de playlist, cliquer sur les trois points (...)",
  'Cliquer sur "Partager", puis "Copier le lien de la playlist"',
  'Sélectionner la partie de l\'URL après "playlist/"'
])
const item = ref(0)

function displayText () {
  console.log(pictures[item.value])
}
</script>
<template>
  <UCarousel
    v-slot="{ item, index }"
    :items="pictures"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden"
    arrows
  >
    <div class="text-center mx-auto">
      <img :src="item" class="w-full" draggable="false" />
      <p class="font-semibold">{{ texts[index] }}</p>
    </div>
  </UCarousel>
</template>
