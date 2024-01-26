<template>
  <div class="header__container">
    <!-- ============================== logo ================================================= -->
    <div class="header__logo">
      <RouterLink to="/">
        <img src="@/assets/img/img_logo_two.jpg" alt="jpg" />
      </RouterLink>
    </div>
    <div class="header__wrapper">
      <!-- ============================== wrapper- nav ========================================= -->
      <div class="header__burger-content" :class="{ active: isBurgerMenuOpen }">
        <nav class="header__nav">
          <a @click="scrollToSection('serv')" href="#serv">{{ $t('header.services') }}</a>
          <a @click="scrollToSection('mastr')" href="#mastr">{{ $t('header.masters') }}</a>
          <a @click="scrollToSection('abt')" href="#abt">{{ $t('header.about') }}</a>
          <a @click="scrollToSection('cont')" href="#cont">{{ $t('header.contacts') }}</a>
          <RouterLink to="/entry">{{ $t('header.entry') }}</RouterLink>
        </nav>
        <div class="header__action">
          <div class="action__locale">
            <button @click="setLocale('ua')">ua</button>
            <button @click="setLocale('en')">en</button>
          </div>
          <div class="action__auth">
            <button v-if="getUser" @click="onLogout">{{ $t('header.logout') }}</button>
            <button v-else @click="onLogin">{{ $t('header.login') }}</button>
          </div>
        </div>
      </div>
      <!-- ============================== bell-entry ========================================= -->
      <div class="header__button-entry" @click="togglePopup">
        <button>
          <font-awesome-icon :icon="['fas', 'bell']" size="2xl" style="color: #ffffff" />
        </button>
        <span v-if="getItemsList && getItemsList.length > 0" class="header__bell-span">{{
          getItemsList.length
        }}</span>
      </div>
      <!-- ============================== burger-btn ========================================== -->
      <div class="header__burger-btn">
        <button @click="toggleBurgerMenu">
          <font-awesome-icon :icon="burgerIcon" size="2xl" style="color: #ffffff" />
        </button>
      </div>
      <!-- ============================== popup ========================================= -->
      <transition name="modal">
        <div v-if="visiblePopup" class="header__popap">
          <div class="popap__wrapper">
            <div class="popap__txt">
              <div v-if="getItemsList.length === 0" class="txt-empty">
                <div class="empty__info">Щоб побачити записи, треба залогінитись</div>
              </div>

              <div v-for="item in getItemsList" :key="item.id" class="popap__item">
                <div class="popap__date">
                  <span>{{ $t('header.dateSpan') }}</span> <span>{{ item.dateOfEntry }}</span>
                </div>
                <div class="popap__master">
                  <span>{{ $t('header.masterSpan') }}</span
                  ><span>{{ item.nameMaster }}</span>
                </div>
                <div class="popap__service">
                  <span>{{ $t('header.serviceSpan') }}</span> <span>{{ item.nameService }}</span>
                </div>
              </div>
            </div>
            <div class="popap__note">{{ $t('header.popapNote') }}</div>
            <div class="popap__btn">
              <button @click="togglePopup">{{ $t('header.popupButton') }}</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
//==== import
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()

//==== import store
import { useAuthStore } from '@/stores/auth.js'
const user = useAuthStore()
const { loginWithGoogleAccount, logOut } = user
const { getUser } = storeToRefs(user)
import { useListOfEntriesStore } from '@/stores/listOfEntriesToTheMasters.js'
const listOfEntries = useListOfEntriesStore()
const { loadFilteredData } = listOfEntries
const { getItemsList } = storeToRefs(listOfEntries)

//==== moduls helper
import { useLocales } from '@/modulesHalpers/i18n.js'
const { setLocale } = useLocales()
//==== data
const isBurgerMenuOpen = ref(false)
const burgerIcon = ref(['fas', 'burger'])
const visiblePopup = ref(false)

//==== methosds
function toggleBurgerMenu() {
  isBurgerMenuOpen.value = !isBurgerMenuOpen.value
  burgerIcon.value = isBurgerMenuOpen.value ? ['fas', 'xmark'] : ['fas', 'burger']
}
function onLogin() {
  loginWithGoogleAccount().then((res) => {
    sessionStorage.setItem('sessionName', res.displayName)
    loadFilterList()
    router.push({
      name: 'home'
    })
  })
}
function onLogout() {
  logOut()
  sessionStorage.removeItem('sessionName')
  loadFilterList()
  router.push({
    name: 'home'
  })
}
function loadFilterList() {
  const sessionName = sessionStorage.getItem('sessionName')
  loadFilteredData('client', '==', sessionName)
}
function togglePopup() {
  visiblePopup.value = !visiblePopup.value
  // console.log(visiblePopup.value)
}

function scrollToSection(section) {
  const targetElement = document.getElementById(section)
  if (targetElement) {
    const targetPosition = targetElement.offsetTop
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    const duration = 1000
    let start = null

    const animateScroll = (timestamp) => {
      if (!start) start = timestamp
      const progress = timestamp - start

      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration))

      if (progress < duration) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }
}

// Функція для роботи зі згладжуванням анімації
function easeInOutCubic(t, b, c, d) {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t * t + b
  t -= 2
  return (c / 2) * (t * t * t + 2) + b
}

//==== hooks
</script>

<style lang="scss" scoped>
.header {
  &__container {
    display: flex;
    justify-content: space-between;
    // background-color: black;
    align-items: center;
  }

  &__logo {
    flex: 0 0 80px;
    @media (max-width: 842px) {
      position: relative;
      z-index: 10;
    }
    img {
      border-radius: 50%;
    }
  }

  &__wrapper {
    display: flex;
    column-gap: 40px;
  }

  &__burger-content {
    padding-right: 40px;
    border-right: 2px #ffffff solid;
    @media (max-width: 842px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80%;
      overflow: auto;
      background-color: black;
      padding: 100px 0 20px 20px;
      border-right: none;
      //========================
      transition: transform 0.3s ease-in-out;
      transform: translateY(-100%);
    }
  }

  &__nav {
    margin-bottom: 10px;
    display: flex;
    column-gap: 50px;
    @media (max-width: 842px) {
      margin-bottom: 20px;
    }
    @media (max-width: 666px) {
      flex-direction: column;
      row-gap: 40px;
      margin-bottom: 60px;
    }

    a {
      color: #ffffff;
      transition: color 0.4s;
      @media (hover: hover) {
        &:hover {
          color: #aa9a9abc;
        }
      }
    }
  }

  &__action {
    display: flex;
    justify-content: end;
    column-gap: 20px;
    @media (max-width: 842px) {
      justify-content: start;
    }
  }

  &__button-entry {
    position: relative;
  }

  &__bell-span {
    position: absolute;
    top: 0;
    right: -3px;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    padding: 2px;
    border-radius: 50%;
    text-align: center;
    border: 1px rgba(0, 0, 0, 0.619) solid;
    cursor: pointer;
  }

  &__burger-btn {
    display: none;
    @media (max-width: 842px) {
      display: block;
      position: relative;
    }
  }

  &__popap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.767);
    display: flex;
    justify-content: center;
    align-items: center;
    //=====================

    z-index: 11;
  }
}
.action {
  &__locale {
    & > :first-child {
      margin-right: 10px;
    }
    button {
      color: #ffffff;
      font-weight: 600;
      transition: color 0.4s;
      @media (hover: hover) {
        &:hover {
          color: #aa9a9abc;
        }
      }
    }
  }

  &__auth {
    button {
      color: #ffffff;
      transition: color 0.4s;
      @media (hover: hover) {
        &:hover {
          color: #aa9a9abc;
        }
      }
    }
  }
}
.popap {
  &__wrapper {
    flex: 0 1 400px;
    background-color: #d0d0d0ec;
    border-radius: 5px;
    padding: 10px;
  }
  // &__txt {
  // }
  &__item {
    border: 1px rgba(0, 0, 0, 0.386) solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 20px;
    & > :not(:last-child) {
      margin-bottom: 30px;
    }
  }

  &__date {
    & > :first-child {
      margin-right: 15px;
      font-weight: 600;
    }
  }

  &__master {
    & > :first-child {
      margin-right: 15px;
      font-weight: 600;
    }
  }

  &__service {
    & > :first-child {
      margin-right: 15px;
      font-weight: 600;
    }
  }

  &__note {
    text-align: center;
    font-weight: 500;
    margin-bottom: 15px;
  }

  &__btn {
    display: flex;
    justify-content: center;
    button {
      padding: 5px;
      border: 1px rgba(0, 0, 0, 0.458) solid;
      border-radius: 5px;
      background-color: transparent;
      transition: background-color 0.4s;
      @media (hover: hover) {
        &:hover {
          background-color: rgba(0, 0, 0, 0.446);
        }
      }
    }
  }
}
.active {
  transform: translateY(0%);
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
