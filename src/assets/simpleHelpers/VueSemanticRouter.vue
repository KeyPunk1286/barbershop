<template>
  <div>
    {{ currentTargetCode }}
  </div>
</template>

<script setup>
// для передачі назви на сторінку в розмітку
// назву з роутера робимо так:
// у самому компоненті в роутах треба:
// path: /sequrity/:target <- назва params

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const codeList = {
  phone: 'iphone',
  notebook: 'razer',
  mouse: 'logitech'
}
const route = useRoute()
const targetValue = computed(() => route.params.target)

const currentTargetCode = computed(() => {
  if (targetValue in codeList) return codeList[targetValue]
  else return 'sorry error'
})
</script>

<style lang="scss" scoped></style>
