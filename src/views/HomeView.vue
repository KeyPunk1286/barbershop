<template>
  <header id="hdr" class="header">
    <the-header />
  </header>
  <main class="main">
    <ui-loading-component v-if="isLoading" />
    <ui-errore-component v-if="hasError" />
    <div class="contente" v-if="!hasError">
      <div class="maine__introduce">
        <introduce-part />
      </div>
      <div id="serv" class="maine__service">
        <servicec-part />
      </div>
      <div class="maine__barber">
        <barber-part />
      </div>
      <div id="mastr" class="maine__masters">
        <masters-part />
      </div>
      <div id="abt" class="maine__about">
        <about-us-part />
      </div>
      <div id="cont" class="maine__contact">
        <contact-part />
      </div>
    </div>
  </main>
  <footer class="footer">
    <the-footer />
  </footer>
</template>

<script setup>
//==== import
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
//==== import store
import { useListOfEntriesStore } from '@/stores/listOfEntriesToTheMasters.js'
const listOfEntriesStore = useListOfEntriesStore()
const { loadFilteredData } = listOfEntriesStore
import { useGeneralStore } from '@/stores/general.js'
const generalStore = useGeneralStore()
const { isLoading, hasError } = storeToRefs(generalStore)
//=== import component
import TheHeader from '@/components/blocks/TheHeader.vue'
import IntroducePart from '@/components/contente/IntroducePart.vue'
import ServicecPart from '@/components/contente/ServicecPart.vue'
import BarberPart from '@/components/contente/BarberPart.vue'
import MastersPart from '@/components/contente/MastersPart.vue'
import AboutUsPart from '@/components/contente/AboutUsPart.vue'
import ContactPart from '@/components/contente/ContactPart.vue'
import TheFooter from '@/components/blocks/TheFooter.vue'
import UiLoadingComponent from '@/components/iu/UiLoadingComponent.vue'
import UiErroreComponent from '@/components/iu/UiErroreComponent.vue'
//==== hooks
onMounted(() => {
  const sessionName = sessionStorage.getItem('sessionName')
  loadFilteredData('client', '==', sessionName)
})
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  background-color: black;
  padding: 5px 0;
}

.maine {
  &__introduce {
    padding: 80px 0 0 0;
    background-color: black;
  }
  &__service {
  }

  &__barber {
    background-color: black;
  }

  &__masters {
    background-color: black;
  }

  &__about {
  }

  &__contact {
  }
}
.footer {
  background-color: black;
}
</style>
