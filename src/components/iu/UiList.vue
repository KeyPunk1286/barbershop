<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useListOfEntriesStore } from '@/stores/listOfEntriesToTheMasters.js'
const listOfEntriesStore = useListOfEntriesStore()
const { loadItemsList } = listOfEntriesStore
const { getItemsList } = storeToRefs(listOfEntriesStore)
</script>

<style lang="scss" scoped></style>
