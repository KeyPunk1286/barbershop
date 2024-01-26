import { defineStore } from 'pinia'
import getStoreTemplate from '@/stores/helpers/storeTemplate'
import { useGeneralStore } from '@/stores/general'

export const useServicesListStore = defineStore('ServicesList', () => {
  const generalStore = useGeneralStore()
  const { generalApiOperation } = generalStore

  return getStoreTemplate('barbershopServicesList', generalApiOperation)
})
