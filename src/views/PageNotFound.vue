<template>
  <div>
    <div>
      <h3>Page not found</h3>
      <div><button @click="backToHomePage">повернутись на головну</button></div>
    </div>
  </div>
</template>

<script setup>
//==== import ====//
import { useRouter } from 'vue-router'
const router = useRouter()
//==== import component =====//
//==== methods =====//
function backToHomePage() {
  router.push({
    name: 'home'
  })
}
</script>

<style lang="scss" scoped></style>
