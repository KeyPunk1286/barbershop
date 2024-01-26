<template>
  <div class="services__container">
    <div class="services__info-box">
      <div class="services__work-time">
        <span>{{ $t('servicesComponent.work') }}</span>
        <hr />
        10:00 - 21:00 ({{ $t('servicesComponent.time') }})
      </div>
      <div class="services__adress">
        {{ $t('servicesComponent.street') }}, 6
        <hr />
        +3800953452028
      </div>
      <div class="services__list">
        <div v-for="item in getServicesList" :key="item.id" class="services__item">
          <div class="services__name">{{ item[serviceBarbershop] }}</div>
          <div class="services__price">
            <span>{{ item.price }} </span>
            <font-awesome-icon :icon="['fas', 'hryvnia-sign']" style="color: #000000" />
          </div>
        </div>
      </div>
      <div class="services__btn">
        <button @click="onCreateEntry">{{ $t('servicesComponent.button') }}</button>
      </div>
    </div>

    <div class="services__lidrary">
      <div class="services__cards">
        <div class="services__txt">
          <div>{{ $t('servicesComponent.cartOne') }}</div>
        </div>
        <div class="services__img"><img src="@/assets/img/fifteen.jpg" alt="jpg" /></div>
      </div>
      <div class="services__cards">
        <div class="services__txt">
          <div>{{ $t('servicesComponent.cartTwo') }}</div>
        </div>
        <div class="services__img"><img src="@/assets/img/foure.jpg" alt="jpg" /></div>
      </div>
      <div class="services__cards">
        <div class="services__txt">
          <div>{{ $t('servicesComponent.cartThree') }}</div>
        </div>
        <div class="services__img"><img src="@/assets/img/ten.jpg" alt="jpg" /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
//==== import
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
//==== import store
import { useLocales } from '@/modulesHalpers/i18n.js'
const { locale } = useLocales()
import { useServicesListStore } from '@/stores/services.js'
const servicesListStore = useServicesListStore()
const { loadServicesItemsList } = servicesListStore
const { getServicesList } = storeToRefs(servicesListStore)
//==== computed
const serviceBarbershop = computed(() => (locale.value == 'ua' ? 'service' : 'serviceEn'))
//==== methods
function onCreateEntry() {
  router.push({
    name: 'entry'
  })
}
//==== hooks
onMounted(() => {
  loadServicesItemsList()
})
</script>

<style lang="scss" scoped>
.services {
  &__container {
    padding-bottom: 80px;
  }

  &__info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0 50px;
  }

  &__work-time {
    text-align: center;
    line-height: 1.4;
    margin-bottom: 80px;
    span {
      font-weight: 700;
    }
  }

  &__adress {
    text-align: center;
    line-height: 1.4;
    margin-bottom: 50px;
  }

  &__list {
    max-width: 600px;
    margin-bottom: 80px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    column-gap: 50px;
    padding: 20px 0;
    @media (max-width: 534px) {
      flex-direction: column;
    }
  }

  &__name {
    font-weight: 700;
  }

  &__price {
    & > :first-child {
      margin-right: 10px;
    }
  }

  &__btn {
    button {
      color: #ffffff;
      background-color: black;
      padding: 15px;
      transition: background-color 0.5s;
    }
    button:hover {
      background-color: rgba(0, 0, 0, 0.556);
    }
  }

  &__lidrary {
    display: flex;
    justify-content: space-between;
    column-gap: 10px;
    @media (max-width: 1192px) {
      flex-direction: column;
    }
  }

  &__cards {
    flex: 0 1 500px;
    // overflow: hidden;
    position: relative;
    @media (max-width: 1192px) {
      // max-height: 400px;
    }
  }

  &__txt {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    padding: 170px 0 30px;
    color: #ffffff;
    font-weight: 800;
    @media (max-width: 1192px) {
      padding: 30px 0 0;
    }
    @media (max-width: 480px) {
      padding: 30px 10px 0;
    }
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // padding: 0 0 10px 0;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
}

// .services {
//   &__container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px 0 50px;
//   }

//   &__work-time {
//     text-align: center;
//     line-height: 1.4;
//     margin-bottom: 80px;
//     span {
//       font-weight: 700;
//     }
//   }

//   &__adress {
//     text-align: center;
//     line-height: 1.4;
//     margin-bottom: 50px;
//   }

//   &__list {
//     max-width: 600px;
//     margin-bottom: 80px;
//   }

//   &__item {
//     display: flex;
//     justify-content: space-between;
//     column-gap: 50px;
//     padding: 20px 0;
//   }
//   &__item:not(:last-child) {
//     border-bottom: 1px black solid;
//   }

//   &__name {
//     font-weight: 700;
//   }

//   &__price {
//     & > :first-child {
//       margin-right: 10px;
//     }
//   }

//   &__btn {
//     button {
//       color: #ffffff;
//       background-color: black;
//       padding: 15px;
//       transition: background-color 0.5s;
//     }
//     button:hover {
//       background-color: rgba(0, 0, 0, 0.556);
//     }
//   }
// }
</style>
