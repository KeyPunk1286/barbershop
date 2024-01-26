<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  overflow: clip;
  min-height: 100%;
}
</style>
