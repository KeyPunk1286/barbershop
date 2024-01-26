import { defineStore } from 'pinia'
import getStoreTemplate from '@/stores/helpers/storeTemplate'
import { useGeneralStore } from '@/stores/general'

export const useMastersListStore = defineStore('mastersList', () => {
  const generalStore = useGeneralStore()
  const { generalApiOperation } = generalStore

  return getStoreTemplate('masterList', generalApiOperation)
})
