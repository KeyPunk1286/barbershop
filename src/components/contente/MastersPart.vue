<template>
  <div class="masters__container">
    <div class="masters__title">
      <h2>{{ $t('mastersComponent.title') }}</h2>
    </div>
    <div class="masters__list">
      <div class="masters__cards">
        <div class="cards__img"><img src="@/assets/img/twenty.jpg" alt="jpg" /></div>
        <div class="cards__info">
          <h3 class="cards__name">{{ $t('mastersComponent.masterOne') }}</h3>
          <p class="cards__txt">
            {{ $t('mastersComponent.yuriTxt') }}
          </p>
        </div>
      </div>
      <div class="masters__cards">
        <div class="cards__info">
          <h3 class="cards__name">{{ $t('mastersComponent.masterTwo') }}</h3>
          <p class="cards__txt">
            {{ $t('mastersComponent.romanTxt') }}
          </p>
        </div>
        <div class="cards__img"><img src="@/assets/img/tvelve.jpg" alt="jpg" /></div>
      </div>
      <div class="masters__cards">
        <div class="cards__img"><img src="@/assets/img/six.jpg" alt="jpg" /></div>
        <div class="cards__info">
          <h3 class="cards__name">{{ $t('mastersComponent.masterThree') }}</h3>
          <p class="cards__txt">
            {{ $t('mastersComponent.volodymyrTxt') }}
          </p>
        </div>
      </div>
      <div class="masters__cards">
        <div class="cards__info">
          <h3 class="cards__name">{{ $t('mastersComponent.masterFoure') }}</h3>
          <p class="cards__txt">
            {{ $t('mastersComponent.ihorTxt') }}
          </p>
        </div>
        <div class="cards__img"><img src="@/assets/img/eighteen.jpg" alt="jpg" /></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.masters {
  &__container {
    padding: 40px 0;
    // background-color: black;
  }

  &__title {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    color: #ffff;
  }

  &__list {
    @media (max-width: 856px) {
      & > :not(:last-child) {
        margin-bottom: 50px;
      }
    }
  }

  &__cards {
    display: flex;
    @media (max-width: 856px) {
      flex-direction: column;
      row-gap: 10px;
    }
  }
}
.cards {
  &__img {
    flex: 0 1 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    flex: 0 1 50%;
    color: #ffff;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__name {
    font-size: 20px;
    margin-bottom: 20px;
    @media (max-width: 510px) {
      font-size: 18px;
    }
  }

  &__txt {
    font-size: 15px;
    // color: #ffff;
    text-align: center;
    font-style: italic;
    @media (max-width: 510px) {
      font-size: 14px;
    }
  }
}
</style>
