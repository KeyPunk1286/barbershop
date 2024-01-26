<template>
  <div class="about__container">
    <div class="about__title">
      <h3>{{ $t('aboutUsComponent.title') }}</h3>
    </div>
    <div class="about__big-baner"><img src="@/assets/img/img_baner.jpg" alt="jpg" /></div>
    <div class="abut__info">
      <p>
        {{ $t('aboutUsComponent.info') }}
      </p>
      <p>{{ $t('aboutUsComponent.infoPartTwo') }}</p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.about {
  &__container {
    padding: 40px 0;
  }

  &__title {
    text-align: center;
    font-weight: 700;
  }

  &__big-baner {
    width: 100%;
    height: 50vh;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.abut {
  &__info {
    padding: 0 100px;
    @media (max-width: 654px) {
      padding: 0 30px;
    }
    & > :first-child {
      margin-bottom: 30px;
    }
    p {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
