<template>
  <ui-loading-component v-if="isLoading" />
  <ui-errore-component v-if="hasError" />
  <div class="content__entry" v-if="!hasError">
    <div class="entry__header">
      <div class="header__box">
        <button @click="setLocale('ua')" class="header__ua-btn">UA</button>
        <RouterLink to="/">
          <img src="@/assets/img/img_logo_two.jpg" alt="jpg" class="header__logo" />
        </RouterLink>
        <button @click="setLocale('en')" class="header__en-btn">EN</button>
      </div>
    </div>

    <div class="entry__container">
      <div class="entry__masters">
        <div class="entry__masters-title">{{ $t('entryView.masterTitle') }}</div>
        <div class="entry__masters-box">
          <div
            v-for="item in getMastersList"
            :key="item.id"
            @click="onSelectMaster(item.name)"
            class="masters__item"
          >
            <div class="masters__avatar">
              <font-awesome-icon :icon="['fas', 'user-tie']" size="2xl" style="color: #000000" />
            </div>
            <div class="masters__info">
              <div class="masters__position">{{ $t('entryView.master') }}</div>
              <div class="masters__name">{{ item[masterName] }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="entry__services">
        <div class="entry__service-title">{{ $t('entryView.serviceTitle') }}</div>
        <div class="entry__service-box">
          <div
            v-for="service in getServicesList"
            :key="service.id"
            @click="onSelectService(service.service)"
            class="services__item"
          >
            <span>{{ service[serviceBarbershop] }}</span>
            <div class="services__price">
              <span>{{ service.price }}</span>
              <font-awesome-icon :icon="['fas', 'hryvnia-sign']" style="color: #000000" />
            </div>
          </div>
        </div>
      </div>

      <div class="entry__date">
        <div class="entry__date-title">
          {{ $t('entryView.dateTitle') }}
        </div>
        <div class="entry__calendar">
          <calendar-date @onSelectedDate="selectedDate" class="calendar" />
        </div>
      </div>

      <div class="entry__tel">
        <div class="entry__tel-title">
          {{ $t('entryView.telTitle') }}
        </div>
        <div class="entry__input-tel">
          <input
            v-model="makeAnEntry.numTel"
            type="number"
            :placeholder="$t('entryView.placeholder')"
          />
        </div>
      </div>

      <div class="entry__action">
        <div class="action__submit-btn">
          <button @click="onSubmit">{{ $t('entryView.buttonSubmit') }}</button>
        </div>
      </div>

      <transition name="modal">
        <div v-if="visiblePopup" class="entry__popup">
          <div class="popup__wrapper">
            <div class="popup__txt">{{ $t('entryView.popup') }}</div>
            <div class="popup__btn">
              <button @click="closeThePopup">{{ $t('entryView.buttonPopup') }}</button>
            </div>
          </div>
        </div>
      </transition>

      <div class="img-baner">
        <div class="img-baner__pic"><img src="@/assets/img/thirteen.jpg" alt="jpg" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
//==== import
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
//==== import store
import { useMastersListStore } from '@/stores/masters.js'
const masterListStore = useMastersListStore()
const { loadMastersItemsList } = masterListStore
const { getMastersList } = storeToRefs(masterListStore)
import { useServicesListStore } from '@/stores/services.js'
const servicesListStore = useServicesListStore()
const { loadServicesItemsList } = servicesListStore
const { getServicesList } = storeToRefs(servicesListStore)
import { useListOfEntriesStore } from '@/stores/listOfEntriesToTheMasters.js'
const listOfEntriesStore = useListOfEntriesStore()
const { addItem, loadFilteredData } = listOfEntriesStore
import { useGeneralStore } from '@/stores/general.js'
const generalStore = useGeneralStore()
const { isLoading, hasError } = storeToRefs(generalStore)
//==== iport helpercomponent
import { useLocales } from '@/modulesHalpers/i18n.js'
const { locale, setLocale } = useLocales()
//==== import component
import UiLoadingComponent from '@/components/iu/UiLoadingComponent.vue'
import UiErroreComponent from '@/components/iu/UiErroreComponent.vue'

import CalendarDate from '@/components/pickers/CalendarDate.vue'
//==== data
const makeAnEntry = ref({})
const visiblePopup = ref(false)

//==== computed
const masterName = computed(() => (locale.value == 'ua' ? 'name' : 'nameEn'))
const serviceBarbershop = computed(() => (locale.value == 'ua' ? 'service' : 'serviceEn'))

//=== methods
function onSelectMaster(itemName) {
  makeAnEntry.value = {
    ...makeAnEntry.value,
    nameMaster: itemName
  }
}
function onSelectService(itemService) {
  makeAnEntry.value = {
    ...makeAnEntry.value,
    nameService: itemService
  }
}
function selectedDate(date) {
  makeAnEntry.value = {
    ...makeAnEntry.value,
    dateOfEntry: date
  }
}
function onSubmit() {
  const tempObj = makeAnEntry.value
  const customItem = sessionStorage.getItem('sessionName')
  makeAnEntry.value = {
    ...makeAnEntry.value,
    client: customItem
  }
  if (
    tempObj.hasOwnProperty('nameMaster') &&
    tempObj.hasOwnProperty('nameService') &&
    tempObj.hasOwnProperty('dateOfEntry') &&
    tempObj.hasOwnProperty('numTel')
  ) {
    addItem(makeAnEntry.value)
    makeAnEntry.value = {}
    router.push({
      name: 'home'
    })
    // loadFilteredData('client', '==', customItem)
  } else {
    visiblePopup.value = true
  }
}
function closeThePopup() {
  visiblePopup.value = false
}
//==== hooks
onMounted(() => {
  loadMastersItemsList()
  loadServicesItemsList()
})
</script>

<style lang="scss" scoped>
.entry {
  &__header {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    background-color: black;
  }
}
.header {
  &__box {
    display: flex;
    align-items: center;
    column-gap: 40px;
    font-size: 20px;
    font-weight: 600;
  }

  &__ua-btn {
    color: #fff;
    transition: color 0.4s;
    @media (hover: hover) {
      &:hover {
        color: #aa9a9abc;
      }
    }
  }

  &__logo {
    border-radius: 50%;
  }

  &__en-btn {
    color: #fff;
    transition: color 0.4s;
    @media (hover: hover) {
      &:hover {
        color: #aa9a9abc;
      }
    }
  }
}

.entry {
  &__container {
    padding: 40px 0;
  }

  &__masters {
    margin-bottom: 50px;
  }

  &__masters-title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }

  &__masters-box {
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
  }

  &__services {
    margin-bottom: 50px;
  }

  &__service-title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }

  &__service-box {
    max-width: 500px;
    margin: 0 auto;
    padding: 10px;
  }

  &__date {
    margin-bottom: 50px;
  }

  &__date-title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }

  &__calendar {
    // display: flex;
  }

  &__tel {
    margin-bottom: 50px;
  }

  &__tel-title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }

  &__input-tel {
    input {
      display: block;
      border: 1px rgba(0, 0, 0, 0.476) solid;
      border-radius: 10px;
      width: 300px;
      padding: 10px 5px;
      margin: 0 auto;
    }
  }

  &__action {
    margin-bottom: 50px;
  }

  &__popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.767);
    z-index: 11;
  }
}
.masters {
  &__item {
    border-bottom: 1px black solid;
    padding: 10px 0;
    display: flex;
    column-gap: 20px;
    cursor: pointer;
    transition: background-color 0.5s ease;
  }
  &__item:active {
    background-color: rgba(0, 0, 0, 0.46);
  }

  &__avatar {
  }

  &__info {
  }

  &__position {
    font-weight: 600;
  }

  &__name {
  }
}
.services {
  &__item {
    border-bottom: 1px black solid;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    transition: background-color 0.5s ease;
    @media (max-width: 480px) {
      flex-direction: column;
    }
    cursor: pointer;
  }
  &__item:active {
    background-color: rgba(0, 0, 0, 0.46);
  }
  &__price {
    & > :first-child {
      margin-right: 5px;
    }
  }
}
.action {
  &__submit-btn {
    button {
      display: block;
      color: #fff;
      background-color: black;
      padding: 15px 10px;
      margin: 0 auto;
      transition: background-color 0.5s ease;
    }
    button:active {
      background-color: rgb(117, 117, 117);
    }
  }
}
.popup {
  &__wrapper {
    flex: 0 1 400px;
    background-color: #d0d0d0ec;
    border-radius: 10px;
    padding: 10px;
  }
  &__txt {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  &__btn {
    button {
      display: block;
      margin: 0 auto;
      border: 1px rgba(0, 0, 0, 0.374) solid;
      padding: 15px 10px;
      border-radius: 10px;
    }
  }
}
.calendar {
  margin: 0 auto;
}
.img-baner {
  &__pic {
    max-width: 100%;
    // width: 100vw;
    height: 50vh;
    // margin: 0 auto;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.modal-enter-active {
  animation: 0.35s fade forwards;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
