<template>
  <div class="login-page">
    <div class="login-page__title">
      {{ $t('loginPage.title') }}
    </div>
    <div class="login-page__box">
      <div class="box__login">
        <button @click="onLogin">{{ $t('loginPage.login') }}</button>
      </div>
      <div class="box__go-back">
        <button @click="backToHomePage">{{ $t('loginPage.goBack') }}</button>
      </div>
    </div>
    <div class="login-page__img"><img src="@/assets/img/eleven.jpg" alt="jpg" /></div>
  </div>
</template>

<script setup>
//==== import
import { useRouter } from 'vue-router'
const router = useRouter()
//==== store

import { useAuthStore } from '@/stores/auth.js'
const user = useAuthStore()
const { loginWithGoogleAccount } = user
//==== methods
function onLogin() {
  loginWithGoogleAccount().then((res) => {
    sessionStorage.setItem('sessionName', res.displayName)
    router.push({
      name: 'entry'
    })
  })
}
function backToHomePage() {
  router.push({
    name: 'home'
  })
}
</script>

<style lang="scss" scoped>
.login-page {
  padding-top: 100px;
  background-color: black;

  &__title {
    text-align: center;
    color: #fff;
    margin-bottom: 50px;
    padding: 0 10px;
  }

  &__box {
    margin-bottom: 50px;
    // max-width: 400px;
    // margin: 0 auto;
  }

  &__img {
    width: 100vw;
    height: 80vh;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.box {
  &__login {
    text-align: center;
    color: #fff;
    margin-bottom: 30px;
    button {
      border: 1px #fff solid;
      border-radius: 5px;
      padding: 15px 10px;
      transition: background-color 0.5s;
      @media (hover: hover) {
        &:hover {
          background-color: #828282;
        }
      }
    }
  }

  &__go-back {
    text-align: center;
    color: #fff;
    button {
      border: 1px #fff solid;
      border-radius: 5px;
      padding: 15px 10px;
      transition: background-color 0.5s;
      @media (hover: hover) {
        &:hover {
          background-color: #828282;
        }
      }
    }
  }
}
</style>
