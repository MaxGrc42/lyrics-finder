<script setup>
const router = useRouter()

function goBack () {
  router.go(-1)
}
</script>
<template>
  <UButton
    class="back"
    color="gray"
    @click="goBack()"
    icon="i-heroicons-arrow-left"
  >
    <p class="text">Retour</p>
  </UButton>
</template>
<style scoped>
.back {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2%;
  width: 10vw;
  height: 5vh;
}

.text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1vw;
  font-size: 1.2em;
}

@media (orientation: portrait) {
  .text {
    display: none;
  }
}
</style>
