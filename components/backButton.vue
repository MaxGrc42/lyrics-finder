<script setup>
const router = useRouter()

function goBack () {
  router.go(-1)
}
</script>
<template>
  <UButton class="back" @click="goBack()" icon="i-heroicons-arrow-left">
    Retour
  </UButton>
</template>
<style scoped>
.back {
  margin-top: 2%;
  margin-left: 2%;
  width: 10vw;
  height: 5vh;
}
</style>
