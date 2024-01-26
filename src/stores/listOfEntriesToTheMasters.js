import { defineStore } from 'pinia'
import getStoreTemplate from '@/stores/helpers/storeTemplate'
import { useGeneralStore } from '@/stores/general.js'

export const useListOfEntriesStore = defineStore('listOfEntries', () => {
  const generalStore = useGeneralStore()
  const { generalApiOperation } = generalStore

  return getStoreTemplate('listOfEntriesToTheMasters', generalApiOperation)
})
